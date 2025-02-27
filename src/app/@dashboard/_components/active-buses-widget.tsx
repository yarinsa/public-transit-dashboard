'use client'
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBus } from "react-icons/lu";

const useActiveBuses = () => {
  // Placeholder for the hook that will fetch data
  const [data, setData] = useState({ active: 0, total: 0 });

  useEffect(() => {
    // Simulate fetching data
    setData({ active: 126, total: 130 });
  }, []);

  return data;
};

export const ActiveBusesWidget = () => {
  const { active, total } = useActiveBuses();

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
            Active Buses
          </Text>
          <Icon as={LuBus} boxSize={6} color="orange.500" />
        </HStack>
        <Text fontSize="3xl" fontWeight="bold">
          {active}
        </Text>
        <Text fontSize="md" color="gray.500">
          Out of {total} total
        </Text>
      </VStack>
    </Box>
  );
}; 