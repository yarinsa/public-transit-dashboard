'use client';

import { Icon } from "@chakra-ui/react";
import { LuBusFront, LuTrainFront, LuUsers, LuGauge, LuClock, LuChartBar, LuTable } from "react-icons/lu";

export const BusIcon = () => (
  <Icon as={LuBusFront} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="orange.600" />
);

export const TrainIcon = () => (
  <Icon as={LuTrainFront} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="blue.600" />
);

export const UsersIcon = () => (
  <Icon as={LuUsers} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="green.600" />
);

export const SpeedIcon = () => (
  <Icon as={LuGauge} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="purple.600" />
);

export const ClockIcon = () => (
  <Icon as={LuClock} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="red.600" />
);

export const ChartIcon = () => (
  <Icon as={LuChartBar} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="teal.600" />
);

export const TableIcon = () => (
  <Icon as={LuTable} bgColor="bg.emphasized" p={2} borderRadius="full" boxSize={8} color="cyan.600" />
); 