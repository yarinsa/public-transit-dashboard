'use client'

import { Button } from "@chakra-ui/react";

import { ButtonGroup } from "@chakra-ui/react";
import { LuBug, LuPlane, LuTrainFront } from "react-icons/lu";
import { useTransportationMethod } from "../_hooks/useTransportationMethod";

const items = [
  {label: "All", value: "all", colorPalette: "blue", icon: <></>},
  {label: "Flights", value: "flights", colorPalette: "yellow", icon: <LuPlane />},
  {label: "Trains", value: "trains", colorPalette: "red", icon: <LuTrainFront />},
  {label: "Buses", value: "buses", colorPalette: "green", icon: <LuBug />},
] as const

export const Filters = () => {
  const { methods, setMethods } = useTransportationMethod();
  const isActive = (value: string) => methods.includes(value);
  const onMethodClick = (value: string) => setMethods(prev => value === "all" ? ["all"] : Array.from(new Set([...prev, value].filter(m => m !== "all"))));
  return (
    <ButtonGroup gap={4}>
    {items.map(({label, value, colorPalette, icon}) => (
      <Button px={4} key={value} variant={isActive(value) ? "solid" : "outline"} colorPalette={colorPalette} onClick={() => onMethodClick(value)}>
        {icon}
        {label}
      </Button>
    ))}
  </ButtonGroup>
  );
};