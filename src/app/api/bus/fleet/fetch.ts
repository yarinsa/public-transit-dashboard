import { filter, tidy } from "@tidyjs/tidy";

const REFRESH_INTERVAL = 60 * 60 * 24; // 24 hours
const RESOURCE_ID = "d32171d2-7a47-4bb3-89cb-d11305c0692d";

export async function getActiveBusesCount() {
  const limit = 1_000;

  const totalBuses = new URLSearchParams({
    resource_id: RESOURCE_ID,
    limit: `1`,
  });
  const totalBusesUrl = `https://data.gov.il/api/3/action/datastore_search?${totalBuses.toString()}`;
  const totalBusesResponse = await fetch(totalBusesUrl, {next: {revalidate: REFRESH_INTERVAL}});
  const totalBusesData = await totalBusesResponse.json();
  const totalBusesCount = totalBusesData.result.total;
  // Construct the URL with query parameters using URLSearchParams

    try {
      const params = new URLSearchParams({
        resource_id: RESOURCE_ID,
        limit: limit.toString(),
      });
      const url = `https://data.gov.il/api/3/action/datastore_search?${params.toString()}`;
       const response = await fetch(url, {next: {revalidate: REFRESH_INTERVAL}})
      if (!response.ok) {
          const body = await response.text();
          console.error(body);
          throw new Error("API request failed");
      }
      const data = await response.json();

      if (data.success && data.result.records.length >= 2) {
        // Filter here since the SQL endpoint is blocked
        const records = tidy(data.result.records, filter((record: {trips_count: number}) => record.trips_count > 0));
        return {
          data: {
            active: totalBusesCount - records.length,
            total: totalBusesCount,
          },
        };
      } else {
        throw new Error("Not enough data returned");
      }
    } catch (error) {
      console.error("Error fetching train data:", error);
      // Return a fallback object in case of errors
      return {
        error
      };
    }
  }

export type ActiveBusesData = Awaited<ReturnType<typeof getActiveBusesCount>>;