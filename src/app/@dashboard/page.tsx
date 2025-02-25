import { Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import DashboardHeader from "./_components/header";
import { LuArrowRight } from "react-icons/lu";
import auth from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "./_components/LogoutButton";

const stats = [
  {
    label: `On-Time Rate`,
    value: {
      value: 85,
      change: 10,
      period: `last 30 days`,
    },
  },
  {
    label: `Daily Riders`,
    value: {
      value: 85,
      change: 10,
      period: `last 30 days`,
    },
  },
  {
    label: `Active vehicles`,
    value: {
      value: 126,
      change: 10,
      period: `last 30 days`,
    },
  },
  {
    label: `Average speed`,
    value: {
      value: 25,
      change: 10,
      period: `last 30 days`,
    },
  },
];

const graphs = [
  {
    label: `Punctuality rate (%) over time`,
    data: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30],
    }
  },
  {
    label: `Frequency per day`,
    data: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [10, 20, 30, 40, 50, 60, 70],
    }
  },
];

// Show in table
const upcomingDepartures = [
  {
    line: `A1`,
    type: `Bus`,
    destination: `Tel Aviv`,
    status: `On time`,
    nextDeparture: `12:00`,
  },
  {
    line: `A1`,
    type: `Bus`,
    destination: `Tel Aviv`,
    status: `On time`,
    nextDeparture: `12:00`,
  },
];


const Dashboard = () => {

  return <HStack> <Grid>
    <GridItem gridColumn="1 / -1" bg="white" boxShadow="md" borderRadius="md" p={4}>
      <DashboardHeader />
    </GridItem>
  </Grid>
  <LogoutButton />
  </HStack>
};

export default Dashboard;
