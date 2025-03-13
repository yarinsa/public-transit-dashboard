'use client'

import { ChartIcon } from "@/components/icons";
import { useColorMode } from "@/components/ui/color-mode";
import { HStack, Text, useToken, VStack } from "@chakra-ui/react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BaseWidget } from "../common/BaseWidget";
import { BaseChart } from "../common/BaseChart";

export type TrainPunctualityData = {
  month: number;
  rate: number;
}

type TrainPunctualityWidgetProps = {
  data: TrainPunctualityData[];
}

export function TrainPunctualityWidgetClient({ data }: TrainPunctualityWidgetProps) {
  // Adaptive colors for light and dark modes
  const { colorMode } = useColorMode();
  const [gray300, gray500, green600] = useToken("colors", ["gray.300", "gray.500", "green.600"]);
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const lineColor = green600;
  return (
      <BaseChart title="Train Punctuality Rate (%)" icon={<ChartIcon />}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                const date = new Date()
                date.setMonth(value - 1)
                const month = date.toLocaleString('default', { month: 'short' })
                return month
              }}
              tick={{ fontSize: 12, fill: axisColor }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: axisColor }}
              domain={["auto", "auto"]}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              animationDuration={1500}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "white", border: "1px solid gray" }}
              labelStyle={{ color: "black" }}
            itemStyle={{ color: lineColor }}
          />
        </LineChart>
      </BaseChart>
  );
}