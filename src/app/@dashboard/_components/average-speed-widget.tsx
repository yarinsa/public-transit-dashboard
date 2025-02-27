'use client'

import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuGauge } from "react-icons/lu";

const useAverageSpeed = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState({ value: 0, change: 0, period: "" });

  useEffect(() => {
    // Simulate fetching data
    setData({ value: 28, change: 1.5, period: "last month" });
  }, []);

  return data;
};

export const AverageSpeedWidget = () => {
  const { value, change, period } = useAverageSpeed();

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow="md"
      borderRadius="md"
      p={4}
      width="300px"
    >
      <VStack align="start">
        <HStack justify="space-between" width="100%">
          <Text fontSize="lg" fontWeight="bold">
            Average Speed
          </Text>
          <Icon as={LuGauge} boxSize={6} color="green.500" />
        </HStack>
        <Text fontSize="3xl" fontWeight="bold">
          {value} km/h
        </Text>
        <HStack>
          <Text fontSize="md" color={change < 0 ? "red.500" : "green.500"}>
            {change < 0 ? "↓" : "↑"} {Math.abs(change)}%
          </Text>
          <Text fontSize="md" color="gray.500">
            vs {period}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}; 