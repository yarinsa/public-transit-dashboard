'use client'
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";

const useDailyRiders = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState<Awaited<ReturnType<typeof getTrainOnTimeRate>>>();

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
            Daily Riders
          </Text>
          <Icon as={LuUser} boxSize={6} color="purple.500" />
        </HStack>
        <Text fontSize="3xl" fontWeight="bold">
          {value.toLocaleString()}
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