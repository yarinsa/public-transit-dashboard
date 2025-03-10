import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { ClockIcon } from "@/components/icons";
import { getTrainOnTimeRate } from "../../api/train/fetch";

async function getOnTimeRateData() {
  const response = await fetch(new URL(`/api/train`, process.env.NEXT_PUBLIC_API_URL), {
  });
  const data = await response.json();
  return data as Awaited<ReturnType<typeof getTrainOnTimeRate>>;
}

export async function OnTimeRateWidget() {
  const { value, change, period } = await getOnTimeRateData();

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
          <ClockIcon />
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
}
