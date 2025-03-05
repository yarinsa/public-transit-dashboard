'use client'
import type { getDailyRiders } from "@/app/api/passengers/fetch";
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";

const useDailyRiders = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState<Awaited<ReturnType<typeof getDailyRiders>>>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/passengers");
      const data = await result.json();
      setData(data);
    };
    fetchData();
  }, []);

  return data ?? { value: 0, change: 0, period: "" };
};


export const DailyRidersWidget = () => {
  const { value, change, period } = useDailyRiders();

  return (
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
    >
      <VStack align="stretch">
        <HStack justify="space-between">
          <Text>
            Daily Riders
          </Text>
          <Icon as={LuUsers} bgColor={`bg.emphasized`} p={2} borderRadius={`full`} boxSize={8} color="purple.600" />
        </HStack>
        <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {value.toLocaleString()}
        </Text>
        <HStack>
          <Text fontSize="md" color={Number(change) > 0 ? "green.500" : "red.500"}>
            {change < 0 ? "↓" : "↑"} {Math.abs(change)}%
          </Text>
          <Text fontSize="md" color="gray.500">
            vs {period}
          </Text>
        </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}; 