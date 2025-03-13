import { TrainPunctualityData, TrainPunctualityWidgetClient } from "./train-punctuality-widget";
import { fetchApi } from "../../_utils/api";

export const TrainPunctualityWidget = async () => {
  const data = await fetchApi<{data: TrainPunctualityData[]}>("train-overtime");
  return <TrainPunctualityWidgetClient data={data.data} />;
}
