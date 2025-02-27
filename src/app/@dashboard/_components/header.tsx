'use client'

import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { useTransportationMethod } from "../_hooks/useTransportationMethod";
import { LuPlane, LuTrainFront, LuBus } from "react-icons/lu";

const items = [
  {label: "All", value: "all", colorPalette: "blue", icon: <></>},
  {label: "Flights", value: "flights", colorPalette: "yellow", icon: <LuPlane />},
  {label: "Trains", value: "trains", colorPalette: "red", icon: <LuTrainFront />},
  {label: "Buses", value: "buses", colorPalette: "green", icon: <LuBus />},
] as const
const DashboardHeader = () => {
  const { methods, setMethods } = useTransportationMethod();
  const isActive = (value: string) => methods.includes(value);
  const onMethodClick = (value: string) => setMethods(prev => value === "all" ? ["all"] : [...prev, value].filter(m => m !== "all"));
  return (
    <VStack justify="space-between" align="start" bg="white" _dark={{bg: "gray.800"}} boxShadow="md" borderRadius="md" p={4}>
      <VStack align="start">
        <Heading size="lg">Transit Metrics Dashboard</Heading>
        <Text fontSize="md" color="gray.600">
          Overview of public transportation performance
        </Text>
      </VStack>

      <ButtonGroup gap={4} justify="end">
        {items.map(({label, value, colorPalette, icon}) => (
          <Button px={4} key={value} variant={isActive(value) ? "solid" : "outline"} colorPalette={colorPalette} onClick={() => onMethodClick(value)}>
            {icon}
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </VStack>
  );
};

export default DashboardHeader;
