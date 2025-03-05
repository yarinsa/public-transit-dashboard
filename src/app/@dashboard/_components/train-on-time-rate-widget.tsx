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
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
    >
      <VStack align="stretch">
        <HStack justify="space-between">
          <Text>
            On-Time Rate
          </Text>
          <Icon as={LuClock} bgColor={`bg.emphasized`} p={2} borderRadius={`full`} boxSize={8} color="blue.600" />
        </HStack>

        <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {value}%
        </Text>
        <HStack>
          <Text fontSize="md" color={Number(change) > 0 ? "green.500" : "red.500"}>
            ↑ {change}%
          </Text>
          <Text fontSize="md" color="gray.500">
            vs last {period}
          </Text>
        </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};
