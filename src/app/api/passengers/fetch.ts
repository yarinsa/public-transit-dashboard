import { filter, groupBy, pivotLonger, startsWith, sum, summarize, tidy } from '@tidyjs/tidy';
import { z } from "zod";

const RESOURCE_ID = "e72b10f3-4458-42c1-ba34-9b232feb8bc7";

const daysSchema = z.record(z.string(), z.any());
const recordSchema =z.union([z.object({
    year_key: z.number(),
    month_key: z.number(),
    operator: z.string(),
    // and D{day} for all days of the month (dynamic)
}), daysSchema])
.transform(({year_key,month_key,operator, ...record}) => ({
    year: year_key,
    month: month_key,
    operator: operator,
    ...(typeof record === 'object' && record ? record : {}),
}));


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
          change: "0.0",
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
        change: change.toFixed(1),
        period: "yesterday",
      };
    } else {
      throw new Error("Not enough data returned");
    }
  } catch (error) {
    console.error("Error fetching daily riders data:", error);
    return {
      value: "0",
      change: "0.0",
      period: "yesterday",
    };
  }
}