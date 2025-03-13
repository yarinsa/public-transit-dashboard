export type ChangeMetric = {
  value: number;
  change: number;
  period: string;
};

export type BusFrequencyData = {
  day: string;
  frequency: number;
};

export type TrainPunctualityData = {
  month: number;
  rate: number;
};

export type ActiveBusesData = {
  active: number;
  total: number;
};
