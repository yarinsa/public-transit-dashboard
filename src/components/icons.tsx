'use client';

import { Icon } from "@chakra-ui/react";
import { LuBusFront, LuTrainFront, LuUsers, LuGauge, LuClock, LuChartBar, LuTable } from "react-icons/lu";

export const BusIcon = () => (
  <Icon as={LuBusFront}  p={2} borderRadius="full" boxSize={8} color="orange.600" />
);

export const TrainIcon = () => (
  <Icon as={LuTrainFront}  p={2} borderRadius="full" boxSize={8} color="blue.600" />
);

export const UsersIcon = () => (
  <Icon as={LuUsers}  p={2} borderRadius="full" boxSize={8} color="green.600" />
);

export const SpeedIcon = () => (
  <Icon as={LuGauge}  p={2} borderRadius="full" boxSize={8} color="purple.600" />
);

export const ClockIcon = () => (
  <Icon as={LuClock}  p={2} borderRadius="full" boxSize={8} color="red.600" />
);

export const ChartIcon = () => (
  <Icon as={LuChartBar}  p={2} borderRadius="full" boxSize={8} color="teal.600" />
);

export const TableIcon = () => (
  <Icon as={LuTable}  p={2} borderRadius="full" boxSize={8} color="cyan.600" />
); 