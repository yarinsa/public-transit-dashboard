'use client'

import { HStack, SkeletonCircle, SkeletonText, useToken } from "@chakra-ui/react";
import { Bar, BarChart, Line, LineChart } from "recharts";
import { BaseChart } from "./BaseChart";
import { BaseWidget } from "./BaseWidget";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

// Simple metric widget skeleton
export function MetricWidgetSkeleton() {
  return (
    <BaseWidget title={<SkeletonText noOfLines={1} width="100px" />} icon={<SkeletonCircle size="8" />} >
      <HStack alignSelf="stretch" justify="space-between">
        <SkeletonText noOfLines={1} width="80px" />
        <SkeletonText noOfLines={1} width="120px" />
      </HStack>
    </BaseWidget>
  );
}

// Reuse existing skeletons with common patterns
export function LineChartSkeleton() {
  const colorToken = useColorModeValue(`gray.300`,`gray.200`);
  const [lineColor] = useToken(`colors`, colorToken);
  const createData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      value: Math.floor(Math.random() * 100),
      name: `Day ${i + 1}`,
    }));
  }
  const [data, setData] = useState<ReturnType<typeof createData>>(createData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(createData());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseChart height={300} title={<SkeletonText noOfLines={1} width="100px" />} icon={<SkeletonCircle size={8} />}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={lineColor} />
      </LineChart>
    </BaseChart>
  );
}

export function BarChartSkeleton() {
  const colorToken = useColorModeValue(`gray.300`,`gray.200`);
  const [barColor] = useToken(`colors`, colorToken);
  const createData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      value: Math.floor(Math.random() * 100),
      name: `Day ${i + 1}`,
    }));
  }
  const [data, setData] = useState<ReturnType<typeof createData>>(createData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(createData());
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <BaseChart height={300} title={<SkeletonText noOfLines={1} width="100px" />} icon={<SkeletonCircle size={8} />}>
      <BarChart data={data}>
        <Bar dataKey="value" fill={barColor} />
      </BarChart>
    </BaseChart>
  );
} 