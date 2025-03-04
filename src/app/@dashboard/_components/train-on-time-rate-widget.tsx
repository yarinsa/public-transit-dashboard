'use client'
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuClock } from "react-icons/lu";
import { getTrainOnTimeRate } from "../../api/train/fetch";
const useOnTimeRate = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState<Awaited<ReturnType<typeof getTrainOnTimeRate>>>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/train");
      const data = await result.json();
      setData(data);
    };
    fetchData();
  }, []);

  return data ?? { value: 0, change: 0, period: "" };
};

export const OnTimeRateWidget = () => {
  const { value, change, period } = useOnTimeRate();

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
            On-Time Rate
          </Text>
          <Icon as={LuClock} boxSize={6} color="blue.500" />
        </HStack>
        <Text fontSize="3xl" fontWeight="bold">
          {value}%
        </Text>
        <HStack>
          <Text fontSize="md" color="green.500">
            ↑ {change}%
          </Text>
          <Text fontSize="md" color="gray.500">
            vs last {period}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
