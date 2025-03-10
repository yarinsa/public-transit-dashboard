'use client'

import { Box, Text, useToken, VStack, HStack } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useColorMode } from "@/components/ui/color-mode";
import { ChartIcon } from "@/components/icons";

export type BusFrequencyData = {
  day: string;
  frequency: number;
}

type BusFrequencyChartProps = {
  data: BusFrequencyData[];
}

export function BusFrequencyChartClient({ data }: BusFrequencyChartProps) {
  const { colorMode } = useColorMode();
  const [gray300, gray500, orange600] = useToken("colors", ["gray.300", "gray.500", "orange.600"]);
  // Adaptive colors for light and dark modes
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const barColor = orange600;

  return (
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
      height="100%"
      width="100%"
    >
      <VStack align="start">
        <HStack justify="space-between" width="100%">
          <Text fontSize="md">
            Bus Frequency Per Day
          </Text>
          <ChartIcon />
        </HStack>
        <ResponsiveContainer width="100%" height={300} style={{marginTop: "16px"}}>
          <BarChart data={data}>
            <CartesianGrid  vertical={false} strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
              interval={0} // Show all day labels
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
              domain={[0, 200]} // Adjust based on data range
            />
            <Tooltip
              contentStyle={{ backgroundColor: "white", border: "1px solid gray" }}
              labelStyle={{ color: "black" }}
              itemStyle={{ color: barColor }}
            />
            <Bar dataKey="frequency" fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}

