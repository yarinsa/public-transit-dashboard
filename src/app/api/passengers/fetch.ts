import { filter, groupBy, pivotLonger, startsWith, sum, summarize, tidy } from '@tidyjs/tidy';
import { recordSchema } from './schema';

const RESOURCE_ID = "e72b10f3-4458-42c1-ba34-9b232feb8bc7";


export async function getDailyRiders() {

  const params = new URLSearchParams({
    resource_id: RESOURCE_ID,
  });

  const url = `https://data.gov.il/api/3/action/datastore_search?${params.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const body = await response.text();
      console.error(body);
      throw new Error("API request failed");
    }
    const data = await response.json();

    if (data.success && data.result.records.length >= 2) {
      const records = data.result.records.map((record: unknown) => recordSchema.parse(record));
      if (!Array.isArray(records)) {
        return {
          value: "0",
          change: 0,
          period: "yesterday",
        };
      }
      const totalPerDay = tidy(records,
        pivotLonger({
          cols: startsWith('D', false),
          valuesTo: 'riders',
          namesTo: 'day',
          namesSep: 'D(\\d+)',
        }),
        groupBy('day', [summarize({
          total: sum('riders'),
          day: d => Number(d[0].day.replace('D', '')),
          year: d => d[0].year,
          month: d => d[0].month,
        })]),
        filter(r => r.day >= 1 && r.day <= 31),
      );

      const today = new Date().getDate(); 
      const yesterday = today - 1; 
      // For each record add the total count by summing all the `D{day}` fields
      const todayRiders = totalPerDay[today]?.total || 0; // Default to 0 if undefined
      const yesterdayRiders = totalPerDay[yesterday]?.total || 0; // Default to 0 if undefined
      const change = yesterdayRiders !== 0 ? ((todayRiders - yesterdayRiders) / yesterdayRiders) * 100 : 0;

      return {
        value: todayRiders.toLocaleString(),
        change: Number(change.toFixed(1)),
        period: "yesterday",
      };
    } else {
      throw new Error("Not enough data returned");
    }
  } catch (error) {
    console.error("Error fetching daily riders data:", error);
    return {
      value: "0",
      change: 0,
      period: "yesterday",
    };
  }
}