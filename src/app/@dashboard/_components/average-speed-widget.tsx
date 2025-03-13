import { SpeedIcon } from "@/components/icons";
import { HStack, Text } from "@chakra-ui/react";
import { fetchApi } from "../_utils/api";
import { BaseWidget } from "./common/BaseWidget";

 async function AverageSpeedWidget() {
  const { value, change, period } = await fetchApi<{value: number, change: number, period: string}>("bus/speed");

  return (
    <BaseWidget title="Average Speed" icon={<SpeedIcon />}>
      <HStack justify="space-between" alignItems="center">
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
      </BaseWidget>
  );
} 

export default AverageSpeedWidget;