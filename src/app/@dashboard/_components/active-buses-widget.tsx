import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { BusIcon } from "@/components/icons";

type ActiveBusesData = {
  active: number;
  total: number;
}

async function getActiveBusesData() {
  const response = await fetch(new URL(`/api/bus/fleet`, process.env.NEXT_PUBLIC_API_URL), {
  });
  const data = await response.json();
  return data.data as ActiveBusesData;
}

 async function ActiveBusesWidget() {
  const { active, total } = await getActiveBusesData();

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
          <BusIcon />
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
} 

export default ActiveBusesWidget;