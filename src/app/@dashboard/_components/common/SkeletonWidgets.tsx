import { ChartIcon } from "@/components/icons";
import { HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Bar, BarChart, Line, LineChart } from "recharts";
import { BaseChart } from "./BaseChart";
import { BaseWidget } from "./BaseWidget";

// Simple metric widget skeleton
export function MetricWidgetSkeleton() {
  return (
    <BaseWidget title="" icon={<SkeletonCircle size="8" />}>
      <HStack justify="space-between">
        <SkeletonText noOfLines={1} width="100px" />
        <SkeletonText noOfLines={1} width="80px" />
      </HStack>
    </BaseWidget>
  );
}

// Reuse existing skeletons with common patterns
export function LineChartSkeleton() {
  return (
    <BaseChart title="" icon={<ChartIcon />}>
      <LineChart data={[]}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </BaseChart>
  );
}

export function BarChartSkeleton() {
  return (
    <BaseChart title="" icon={<ChartIcon />}>
      <BarChart data={[]}>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </BaseChart>
  );
} 