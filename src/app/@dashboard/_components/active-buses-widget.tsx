'use client'
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBusFront } from "react-icons/lu";

type ActiveBusesData = {
  active: number;
  total: number;
}

const useActiveBuses = () => {
  const [data, setData] = useState<{ data?: ActiveBusesData, error?: unknown }>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/bus/fleet");
      const data = await result.json();
      setData(data);
    };
    fetchData();
  }, []);

  return { ...data }
};



export const ActiveBusesWidget = () => {
  const { data } = useActiveBuses();
  const { active, total } = data || { active: 0, total: 0 };

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
            Active Buses
          </Text>
          <Icon as={LuBusFront} bgColor={`bg.emphasized`} p={2} borderRadius={`full`} boxSize={8} color="orange.600" />
        </HStack>
        <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {Number(active).toLocaleString()}
        </Text>
        <Text fontSize="md" color="gray.500">
          Out of {Number(total).toLocaleString()} total
        </Text>
        </HStack>
      </VStack>
    </Box>
  );
}; 