import { UsersIcon } from "@/components/icons";
import { HStack, Text } from "@chakra-ui/react";
import { fetchApi } from "../_utils/api";
import { BaseWidget } from "./common/BaseWidget";
  
async function DailyRidersWidget() {
  const { value, change, period } = await fetchApi<{value: number, change: number, period: string}>("passengers");

  return (
    <BaseWidget title="Daily Riders" icon={<UsersIcon />}>
      <HStack justify="space-between" alignItems="center">
        <HStack>
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
      </HStack>
    </BaseWidget>
  );
} 

export default DailyRidersWidget;