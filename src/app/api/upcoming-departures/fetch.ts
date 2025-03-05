import { arrange, asc, filter, mutate, select, slice, tidy } from "@tidyjs/tidy";
import { NextResponse } from "next/server";
import { recordSchema } from "./schema";

const REFRESH_INTERVAL = 1_000 * 60 * 15
const RESOURCE_ID = "e83f763b-b7d7-479e-b172-ae981ddc6de5";

export async function getUpcomingDepartures({limit}:{limit?: string | null}) {
  try {
    const today = new Date();  
    const params = new URLSearchParams({
      resource_id: RESOURCE_ID,
    });
    const url = `https://data.gov.il/api/3/action/datastore_search?${params.toString()}`;
    const response = await fetch(url, { next: { revalidate: REFRESH_INTERVAL } })
    const data = await response.json()
    const records = data.result.records

    
    if (!response.ok || !Array.isArray(records)) {
      const messages = await response.text()
      return NextResponse.json({ error: "External service error", messages }, { status: 503 })
    }
    
    const flightsData = records.map(record => recordSchema.parse(record))

    const upcomingFlights = tidy(flightsData,
      mutate({
        line: (row: { CHOPER: string, CHFLTN: string }) => `${row.CHOPER}${row.CHFLTN}`,
        type: () => `Flight`,
        destination: (row: { CHLOC1D: string }) => row.CHLOC1D || "Unknown",
        status: (row: { CHRMINE: string }) => row.CHRMINE || "Unknown",
        nextDeparture: (row) => {
          const depTime = new Date(row.CHPTOL);
          return depTime > today ? depTime.toISOString() : null;
        },
      }),
      mutate({
        isDeparture: (row) => row.CHAORD === "D", // Filter for departures only
      }),
      filter((row) => row.isDeparture && !["DEPARTED", "LANDED"].includes(row.status)),
      arrange([asc(`nextDeparture`)]),
      select([`line`,`type`, `destination`, `status`, `nextDeparture`]),
      slice(0, Number(limit || "20"))
    )

    return {data: upcomingFlights}
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process external API response" }, { status: 500 })
  }
}
