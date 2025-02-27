'use client'

import { useColorMode } from "@/components/ui/color-mode";
import { Box, Text, useToken, VStack } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Hardcoded data from the provided description
const data = [
  { month: 'Jan', rate: 87 },
  { month: 'Feb', rate: 84 },
  { month: 'Mar', rate: 93 },
  { month: 'Apr', rate: 96 },
  { month: 'May', rate: 90 },
  { month: 'Jun', rate: 87 },
  { month: 'Jul', rate: 87 },
];

export const TrainPunctualityWidget = () => {
  // Adaptive colors for light and dark modes
  const { colorMode } = useColorMode();
  const [gray200,   gray500, green300, green500] = useToken("colors", ["gray.200", "gray.500", "green.300", "green.500"]);
  const axisColor = colorMode === "dark" ? gray500 : gray200;
  const gridColor = colorMode === "dark" ? gray500 : gray200;
  const lineColor = colorMode === "dark" ? green500 : green300;

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="100%" // Responsive width
    >
      <VStack align="start">
        <Text fontSize="xl" fontWeight="bold" >
          Train Punctuality Rate (%)
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              tick={{ fill: axisColor, fontSize: 12 }}
              interval={0} // Show all month labels
            />
            <YAxis
              domain={[84, 96]}
              ticks={[84, 87, 90, 93, 96]}
              tick={{ fill: axisColor, fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={lineColor}
              dot={{ stroke: lineColor, strokeWidth: 1, fill: "white", r: 4 }}
              activeDot={{ r: 6, fill: lineColor }} // Enlarge on hover
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