'use client'

import { ChartIcon } from "@/components/icons";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ReactElement, ReactNode } from "react";

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });

type BaseChartProps = {
  title: string;
  icon?: ReactNode;
  children: ReactElement;
  height?: number;
}

export function BaseChart({ title, icon = <ChartIcon />, children, height = 300 }: BaseChartProps) {
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
          <Text fontSize="md">{title}</Text>
          {icon}
        </HStack>
        <ResponsiveContainer width="100%" height={height} style={{marginTop: "16px"}}>
          {children}
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
} 