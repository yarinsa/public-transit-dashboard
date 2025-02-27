import { z } from "zod";

const statusEnum = z.enum(["הקדמה ביציאה", "איחור", "בזמן"]);
const statusMap = {
    "הקדמה ביציאה": "early",
    "איחור": "late",
    "בזמן": "on time",
}
const recordSchema = z.object({
    shana: z.number(),
    hodesh: z.number(),
    train_station_nm: z.string(),
    station_status_nm: statusEnum,
    status_count: z.number(),
}).transform((record) => ({
    year: record.shana,
    month: record.hodesh,
    station_name: record.train_station_nm,
    status: statusMap[record.station_status_nm],
    count: record.status_count,
}));



type ResponseRecord = z.infer<typeof recordSchema>;
export async function getTrainOnTimeRate() {
  const resourceId = "1ebbbb91-1d44-4f41-a85c-4a93a35e32d6";
  const limit = 1_000;
  const q = '';
  const year = 2025;
  const currentMonth = new Date().getMonth() + 1;
  const previousMonth = currentMonth - 1;
  // Construct the URL with query parameters using URLSearchParams
  const params = new URLSearchParams({
    resource_id: resourceId,
    limit: limit.toString(),
    filters: JSON.stringify({
      shana: year,
      hodesh: [currentMonth, previousMonth],
    }),
    q: q,
  });
  const url = `https://data.gov.il/api/3/action/datastore_search?${params.toString()}`;
    try {
        
       const response = await fetch(url)
      if (!response.ok) {
          const body = await response.text();
          console.error(body);
          throw new Error("API request failed");
      }
      const data = await response.json();

      if (data.success && data.result.records.length >= 2) {
        const records = data.result.records;
        const parsedRecords = records.map((record: ResponseRecord) => recordSchema.parse(record));
        const currentRate = calculateOnTimeRate(parsedRecords);
        return currentRate;
      } else {
        throw new Error("Not enough data returned");
      }
    } catch (error) {
      console.error("Error fetching train data:", error);
      // Return a fallback object in case of errors
      return {
        value: "0.0",
        change: "0.0",
        period: "last week",
      };
    }
  }

  function calculateOnTimeRate(records: ResponseRecord[]) {
    // Step 1: Get unique year-month pairs and sort them
    const yearMonths = Array.from(
        new Set(records.map(r => `${r.year}-${r.month}`))
    )
        .map(ym => ym.split('-').map(Number))
        .sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    // Check if we have at least two months for comparison
    if (yearMonths.length < 2) {
        throw new Error("Not enough data to compare months");
    }

    // Get the most recent and previous year-month pairs
    const currentYM = yearMonths[yearMonths.length - 1]; // [year, month]
    const previousYM = yearMonths[yearMonths.length - 2];

    // Helper function to calculate the on-time rate for a given year-month
    const getRate = (ym: number[]) => {
        const monthRecords = records.filter(
            r => r.year === ym[0] && r.month === ym[1]
        );
        const sumOnTime = monthRecords
            .filter(r => r.status === "on time")
            .reduce((acc, r) => acc + r.count, 0);
        const totalCount = monthRecords
            .reduce((acc, r) => acc + r.count, 0);
        
        // Handle case where totalCount is 0 to avoid division by zero
        return totalCount === 0 ? 0 : (sumOnTime / totalCount) * 100;
    };

    // Calculate rates
    const currentRate = getRate(currentYM);
    const previousRate = getRate(previousYM);
    const change = currentRate - previousRate;

    // Format the output
    return {
        value: `${currentRate.toFixed(1)}`,
        change: change.toFixed(2),
        period: `month`
    };
}