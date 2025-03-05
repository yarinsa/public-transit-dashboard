import { arrange, asc, groupBy, mutate, rename, select, sum, summarize, tidy } from "@tidyjs/tidy";
import { NextResponse } from "next/server";
import { recordSchema } from "./schema";

const REFRESH_INTERVAL = 60 * 60 * 24;
const RESOURCE_ID = "1ebbbb91-1d44-4f41-a85c-4a93a35e32d6";

export async function getTrainPunctualityRate() {
  const period = 6
  const today = new Date()

  // Make request for each month
  const requests = new Array(period).fill(0).map((_, i) => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const params = new URLSearchParams({
      resource_id: RESOURCE_ID,
      filters: JSON.stringify({
        hodesh: month,
        shana: year
      }),
    });

    const url = `https://data.gov.il/api/3/action/datastore_search?${params.toString()}`;
    return fetch(url, { next: { revalidate: REFRESH_INTERVAL } })
  })

  try {

    const responses = await Promise.all(requests)
    const data = await Promise.all(responses.map(response => response.json()))
    const records = data.map(d => d.result.records).flat()
    const parsedRecords = records.map(record => recordSchema.parse(record))

    if (responses.some(response => !response.ok)) {
      const errors = responses.filter(response => !response.ok)
      const messages = await Promise.all(errors.map(async e => await e.text()))
      return NextResponse.json({ error: "External service error", messages }, { status: 503 })
    }

    const monthlyOnTimeRates = tidy(parsedRecords, groupBy([`shana`, `hodesh`], [
      summarize({
        total: sum(`status_count`),
        on_time_count: sum(`status_count`, { predicate: (item) => item.station_status_nm === "בזמן" }),
      }),
      mutate({
        rate: (row: { on_time_count: number, total: number }) => Number(((row.on_time_count / row.total) * 100).toFixed(2)),
      }),
      rename({ hodesh: `month`, shana: `year` }),
    ]))

    const next = tidy(monthlyOnTimeRates, select([`month`, `year`, `total`, `on_time_count`, `rate`, `-shana`, `-hodesh`]), arrange([asc(`year`), asc(`month`)]))
    return {data: next}
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process external API response" }, { status: 500 })
  }
}
