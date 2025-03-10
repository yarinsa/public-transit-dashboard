import { TrainPunctualityData, TrainPunctualityWidgetClient } from "./train-punctuality-widget";


async function getTrainPunctualityData() {
  const response = await fetch(new URL(`/api/train-overtime`, process.env.NEXT_PUBLIC_API_URL), {});
  const data = await response.json();
  return data.data as TrainPunctualityData[];
}

export async function TrainPunctualityWidget() {
  const data = await getTrainPunctualityData();
  return <TrainPunctualityWidgetClient data={data} />;
}
