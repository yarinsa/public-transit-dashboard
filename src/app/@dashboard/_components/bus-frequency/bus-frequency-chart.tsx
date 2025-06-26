'use client'

import { ChartIcon } from "@/components/icons";
import { useColorMode } from "@/components/ui/color-mode";
import { Box, HStack, Text, useToken, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BaseChart } from "../common/BaseChart";

export type BusFrequencyData = {
  day: string;
  frequency: number;
}

type BusFrequencyChartProps = {
  data: BusFrequencyData[];
}

// Glassmorphic Bar Chart for Bus Frequency
const GlassBar = (props: Partial<{ x: number; y: number; width: number; height: number }>) => {
  const { x = 0, y = 0, width = 0, height = 0 } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        rx={4}
        ry={4}
        width={width}
        height={height}
        fill="rgba(33, 150, 243,0.1)"
        filter="url(#glass-blur)"
        style={{ stroke: "rgba(33, 150, 243,0.2)", strokeWidth: 1 }}
      />
      <Rectangle {...props} />
    </g>
  );
};

export function BusFrequencyChartClient({ data }: BusFrequencyChartProps) {
  const { colorMode } = useColorMode();
  const [gray300, gray500] = useToken("colors", ["gray.300", "gray.500"]);
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const barColor = 'rgba(33, 150, 243,0.75)'; // Vibrant blue

  return (
    <BaseChart title="Bus Frequency Per Day" icon={<ChartIcon />}>
      <BarChart data={data}>
        <defs>
          <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"/>
            <feBlend in="SourceGraphic" in2="blur" mode="normal"/>
          </filter>
        </defs>
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
              contentStyle={{
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(33,150,243,0.2)",
                borderRadius: 12,
                boxShadow: "0 4px 24px rgba(33,150,243,0.08)",
                color: "#111",
                fontWeight: 700,
                fontSize: 16,
              }}
              labelStyle={{ color: "#111", fontWeight: 700, fontSize: 16 }}
              itemStyle={{ color: barColor, fontWeight: 600, fontSize: 15 }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="frequency" fill={barColor} radius={[4, 4, 0, 0]} shape={GlassBar} />
      </BarChart>
    </BaseChart>
  );
}


export function BusFrequencyChartSkeleton() {
  const { colorMode } = useColorMode();
  const [gray300, gray500, gray600] = useToken("colors", ["gray.300", "gray.500", "gray.600"]);
  // Adaptive colors for light and dark modes
  const axisColor = colorMode === "dark" ? gray300 : gray500;
  const gridColor = gray500;
  const barColor = gray600;

  const createData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      frequency: Math.random() * 200,
    }));
  }

  const [data, setData] = useState<BusFrequencyData[]>(createData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(createData());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
              contentStyle={{
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(33,150,243,0.2)",
                borderRadius: 12,
                boxShadow: "0 4px 24px rgba(33,150,243,0.08)",
                color: "#111",
                fontWeight: 700,
                fontSize: 16,
              }}
              labelStyle={{ color: "#111", fontWeight: 700, fontSize: 16 }}
              itemStyle={{ color: barColor, fontWeight: 600, fontSize: 15 }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="frequency" fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}
