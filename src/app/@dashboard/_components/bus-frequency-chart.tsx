'use client'
import { Box, Text, useToken, VStack } from "@chakra-ui/react";
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
  const [gray300, gray500, orange600, black] = useToken("colors", ["gray.300", "gray.500", "orange.600", "black"]);
  // Adaptive colors for light and dark modes
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const barColor = orange600;

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow="md"
      borderRadius="md"
      p={4}
      height="100%"
      width="100%" 
    >
      <VStack align="start">
      <Text fontSize="md">
        Bus Frequency Per Day
      </Text>
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
};