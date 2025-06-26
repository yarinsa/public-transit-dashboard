import { BusIcon } from "@/components/icons";
import { HStack, Text } from "@chakra-ui/react";
import { BaseWidget } from "./common/BaseWidget";
import { fetchApi } from "../_utils/api";

type ActiveBusesData = {
  active: number;
  total: number;
};

export const ActiveBusesWidget = async () => {
  const data = await fetchApi<{ data: ActiveBusesData }>("bus/fleet").catch(() => {
    console.error("Failed to fetch active buses data");
    return { data: { active: "N/A", total: "N/A" } };
  });
  const { active, total } = data.data;

  return (
    <BaseWidget title="Active Buses" icon={<BusIcon />}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {Number.isNaN(Number(active))
            ? "N/A"
            : Number(active).toLocaleString()}
        </Text>
        {!Number.isNaN(Number(total)) && (
          <Text fontSize="md" color="gray.500">
            Out of {Number(total).toLocaleString()} total
          </Text>
        )}
      </HStack>
    </BaseWidget>
  );
};

export default ActiveBusesWidget;
