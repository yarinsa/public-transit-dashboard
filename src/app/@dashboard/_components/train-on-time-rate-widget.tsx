import { ClockIcon } from "@/components/icons";
import { HStack, Text } from "@chakra-ui/react";
import { fetchApi } from "../_utils/api";
import { BaseWidget } from "./common/BaseWidget";

async function OnTimeRateWidget() {
  const { value, change, period } = await fetchApi<{value: number, change: number, period: string}>("train");

  return (
    <BaseWidget title="On-Time Rate" icon={<ClockIcon />}>
      <HStack justify="space-between" alignItems="center">
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
    </BaseWidget>
  );
}

export default OnTimeRateWidget;