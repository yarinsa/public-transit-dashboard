import { fetchApi } from "../../_utils/api";
import { BusFrequencyData, BusFrequencyChartClient } from "./bus-frequency-chart";

const BusFrequencyChart = async () => {
  const data = await fetchApi<BusFrequencyData[]>("bus-frequency");
  return <BusFrequencyChartClient data={data} />;
}

export default BusFrequencyChart;