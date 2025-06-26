'use client'

import { HStack, SkeletonCircle, SkeletonText, useToken, Box } from "@chakra-ui/react";
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
  };
  const [data, setData] = useState<ReturnType<typeof createData>>(createData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(createData());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Glassy skeleton bar shape
  const GlassSkeletonBar = (props: Partial<{ x: number; y: number; width: number; height: number }>) => {
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
          fill="rgba(33, 150, 243,0.12)"
          filter="url(#glass-blur)"
          style={{ stroke: "rgba(33, 150, 243,0.18)", strokeWidth: 1 }}
        />
        <rect
          x={x}
          y={y}
          rx={4}
          ry={4}
          width={width}
          height={height}
          fill={barColor}
          opacity={0.5}
        />
      </g>
    );
  };

  // Glassy skeleton icon wrapper
  const GlassSkeletonIcon = (
    <Box
      bg="rgba(33,150,243,0.10)"
      borderRadius="full"
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backdropFilter="blur(8px)"
      border="1px solid rgba(33,150,243,0.18)"
    >
      <SkeletonCircle size={8} />
    </Box>
  );

  // Glassy skeleton title wrapper
  const GlassSkeletonTitle = (
    <Box
      bg="rgba(33,150,243,0.10)"
      borderRadius="lg"
      boxShadow="md"
      display="inline-block"
      backdropFilter="blur(4px)"
      border="1px solid rgba(33,150,243,0.18)"
      minW="100px"
    >
      <SkeletonText noOfLines={1} width="100px" />
    </Box>
  );

  return (
    <BaseChart height={300} title={GlassSkeletonTitle} icon={GlassSkeletonIcon}>
      <BarChart data={data}>
        <defs>
          <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
            />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>
        <Bar dataKey="value" shape={GlassSkeletonBar} />
      </BarChart>
    </BaseChart>
  );
} 