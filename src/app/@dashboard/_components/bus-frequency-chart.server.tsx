import { BusFrequencyData, BusFrequencyChartClient } from "./bus-frequency-chart";


async function getBusFrequencyData() {
  const response = await fetch(new URL(`/api/bus-frequency`, process.env.NEXT_PUBLIC_API_URL), {});
  const data = await response.json();
  return data as BusFrequencyData[];
}

export async function BusFrequencyChart() {
  const data = await getBusFrequencyData();
  console.log(data);
  return <BusFrequencyChartClient data={data} />;
}
