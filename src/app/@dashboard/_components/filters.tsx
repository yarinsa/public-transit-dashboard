'use client'

import { Button } from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import { LuBus, LuPlane, LuTrainFront } from "react-icons/lu"; // Fixed: Changed LuBug to LuBus
import { useTransportationMethod } from "../_hooks/useTransportationMethod";

const items = [
  {label: "All", value: "all", colorPalette: "blue", icon: <></>},
  {label: "Flights", value: "flights", colorPalette: "yellow", icon: <LuPlane />},
  {label: "Trains", value: "trains", colorPalette: "red", icon: <LuTrainFront />},
  {label: "Buses", value: "buses", colorPalette: "green", icon: <LuBus />}, // Fixed: Changed LuBug to LuBus
] as const

export const Filters = () => {
  const { methods, setMethods } = useTransportationMethod();
  const isActive = (value: string) => methods.includes(value);
  const onMethodClick = (value: string) => setMethods(prev => 
    value === "all" ? ["all"] : Array.from(new Set([...prev, value].filter(m => m !== "all")))
  );
  
  return (
    <ButtonGroup gap={4} overflowX="auto" py={2}>
      {items.map(({label, value, colorPalette, icon}) => (
        <Button 
          px={4} 
          size="sm" 
          key={value} 
          variant={isActive(value) ? "solid" : "ghost"} 
          colorPalette={isActive(value) ? colorPalette : "gray"} 
          onClick={() => onMethodClick(value)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};