'use client'
import { Box, Text, useToken } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useColorMode } from "@/components/ui/color-mode";

// Simulated data hook (replace with real data fetching logic if needed)
const useBusFrequencyData = () => {
  const [data, setData] = useState<{ day: string; frequency: number }[]>([]);

  useEffect(() => {
    setData([
      { day: 'Mon', frequency: 100 },
      { day: 'Tue', frequency: 150 },
      { day: 'Wed', frequency: 120 },
      { day: 'Thu', frequency: 130 },
      { day: 'Fri', frequency: 160 },
      { day: 'Sat', frequency: 90 },
      { day: 'Sun', frequency: 60 },
    ]);
  }, []);

  return data;
};

export const BusFrequencyChart = () => {
  const data = useBusFrequencyData();
  const { colorMode } = useColorMode();
  const [gray200, gray500, gray600, orange300, orange500] = useToken("colors", ["gray.200", "gray.500", "gray.600", "orange.300", "orange.500"]);
  // Adaptive colors for light and dark modes
  const axisColor = colorMode === "dark" ? gray500 : gray200;
  const gridColor = colorMode === "dark" ? gray600 : gray200;
  const barColor = colorMode === "dark" ? orange300 : orange500;

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="100%"
      maxW="100%" // Consistent with the train chart's width
      height="300px"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Bus Frequency Per Day
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="day"
            tick={{ fill: axisColor, fontSize: 12 }}
            interval={0} // Show all day labels
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: 12 }}
            domain={[0, 200]} // Adjust based on data range
          />
          <Tooltip
            contentStyle={{ backgroundColor: "white", border: "1px solid gray" }}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: barColor }}
          />
          <Bar dataKey="frequency" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};