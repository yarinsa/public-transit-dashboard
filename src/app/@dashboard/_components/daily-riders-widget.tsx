import type { getDailyRiders } from "@/app/api/passengers/fetch";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { UsersIcon } from "@/components/icons";

async function getDailyRidersData() {
  const response = await fetch(new URL(`/api/passengers`, process.env.NEXT_PUBLIC_API_URL), {
  });
  const data = await response.json();
  return data as Awaited<ReturnType<typeof getDailyRiders>>;
}

export async function DailyRidersWidget() {
  const { value, change, period } = await getDailyRidersData();

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
          <UsersIcon />
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
} 