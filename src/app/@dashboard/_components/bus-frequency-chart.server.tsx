import { BusFrequencyData, BusFrequencyChartClient } from "./bus-frequency-chart";


async function getBusFrequencyData() {
  const response = await fetch(new URL(`/api/bus-frequency`, process.env.NEXT_PUBLIC_API_URL), {});
  const data = await response.json();
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data as BusFrequencyData[];
}

export async function BusFrequencyChart() {
  const data = await getBusFrequencyData();
  return <BusFrequencyChartClient data={data} />;
}
