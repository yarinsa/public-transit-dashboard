'use client'

import { useColorMode } from "@/components/ui/color-mode";
import { Box, Text, useToken, VStack } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const useTrainPunctualityRate = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState<{ data?: any, error?: any }>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/train-overtime");
      const data = await result.json();
      setData(data);
    };
    fetchData();
  }, []);

  return { ...data }
};

export const TrainPunctualityWidget = () => {
  // Adaptive colors for light and dark modes
  const { colorMode } = useColorMode();
  const [gray300,   gray500, green600] = useToken("colors", ["gray.300", "gray.500", "green.600"]);
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const lineColor = green600;
  const {data} = useTrainPunctualityRate();
  return (
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="100%"
    >
      <VStack align="start">
        <Text fontSize="md">
          Train Punctuality Rate (%)
        </Text>
        <ResponsiveContainer width="100%" height={300} style={{marginTop: "16px"}}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                console.log(value)
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
};