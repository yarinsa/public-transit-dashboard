'use client'

import { useColorMode } from "@/components/ui/color-mode";
import { Box, Text, useToken, VStack, HStack, SkeletonText, SkeletonCircle } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartIcon } from "@/components/icons";
import { useEffect } from "react";
import { useState } from "react";

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
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="100%"
    >
      <VStack align="start">
        <HStack justify="space-between" width="100%">
          <Text fontSize="md">
            Train Punctuality Rate (%)
          </Text>
          <ChartIcon />
        </HStack>
        <ResponsiveContainer width="100%" height={300} style={{marginTop: "16px"}}>
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
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}



export const TrainPunctualityWidgetSkeleton = () => {
  const { colorMode } = useColorMode();
  const [gray100, gray500, gray600] = useToken("colors", ["gray.100", "gray.500", "gray.600"]);
  const axisColor = colorMode === "dark" ? gray100 : gray500;
  const gridColor = gray500;
  const lineColor = gray600;

  const createData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      rate: Math.random() * 100,
    }));
  }

  const [data, setData] = useState<TrainPunctualityData[]>(createData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(createData());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="100%"
    >
      <VStack align="start">
        <HStack justify="space-between" width="100%">
          <SkeletonText noOfLines={1} width="100px">
            Train Punctuality Rate (%)
          </SkeletonText>
          <SkeletonCircle size={8}>
            <ChartIcon />
          </SkeletonCircle>
          
        </HStack>
        <ResponsiveContainer width="100%" height={300} style={{marginTop: "16px"}}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickFormatter={() => {
                return ``
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
        </ResponsiveContainer>
      </VStack>
    </Box>
  )
}