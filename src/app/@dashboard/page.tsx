import { Grid, GridItem, HStack } from "@chakra-ui/react";
import { ActiveBusesWidget } from "./_components/active-buses-widget";
import { AverageSpeedWidget } from "./_components/average-speed-widget";
import { BusFrequencyChart } from "./_components/bus-frequency-chart";
import { DailyRidersWidget } from "./_components/daily-riders-widget";
import DashboardHeader from "./_components/header";
import { LogoutButton } from "./_components/LogoutButton";
import { OnTimeRateWidget } from "./_components/train-on-time-rate-widget";
import { TrainPunctualityWidget } from "./_components/train-punctuality-widget";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return <HStack> <Grid gap={4} templateColumns="repeat(4, 1fr)">
    <GridItem gridColumn="1 / -1" boxShadow="md" borderRadius="md">
      <DashboardHeader />
    </GridItem>
    <GridItem>
        <OnTimeRateWidget />
    </GridItem>
    <GridItem>
      <DailyRidersWidget />
    </GridItem>
    <GridItem>
      <ActiveBusesWidget />
    </GridItem>
    <GridItem>
      <AverageSpeedWidget />
    </GridItem>
    <GridItem gridColumn="1 / 3" boxShadow="md" borderRadius="md">
      <TrainPunctualityWidget />
    </GridItem>
    <GridItem gridColumn="3 / 5" boxShadow="md" borderRadius="md">
      <BusFrequencyChart />
    </GridItem>
    <GridItem gridColumn="1 / -1" boxShadow="md" borderRadius="md" >
          <UpcomingDeparturesTable />
        </GridItem>
  </Grid>
  <LogoutButton />
  </HStack>
};

export default Dashboard;
