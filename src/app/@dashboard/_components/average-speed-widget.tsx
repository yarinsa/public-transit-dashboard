import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { SpeedIcon } from "@/components/icons";

async function getAverageSpeedData() {
  return {
    value: 100,
    change: 10,
    period: "day",
  } as { value: number; change: number; period: string };
}

export async function AverageSpeedWidget() {
  const { value, change, period } = await getAverageSpeedData();

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
            Average Speed
          </Text>
          <SpeedIcon />
        </HStack>
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
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
        </HStack>
      </VStack>
    </Box>
  );
} 