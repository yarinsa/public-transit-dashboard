import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { ActiveBusesWidget } from "./_components/active-buses-widget";
import { AverageSpeedWidget } from "./_components/average-speed-widget";
import { BusFrequencyChart } from "./_components/bus-frequency-chart";
import { DailyRidersWidget } from "./_components/daily-riders-widget";
import { OnTimeRateWidget } from "./_components/train-on-time-rate-widget";
import { TrainPunctualityWidget } from "./_components/train-punctuality-widget";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";
import { Filters } from "./_components/filters";

const Dashboard = () => {
  return (
    <VStack gap={4} align="stretch" padding={4}>
    <Filters />
    <Grid gap={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gridAutoRows="auto" gridAutoFlow="row">
      {[OnTimeRateWidget, DailyRidersWidget, ActiveBusesWidget, AverageSpeedWidget].map((Component, index) => (
        <GridItem key={index}>
          <Component />
        </GridItem>
      ))}
      <GridItem colSpan={2}>
        <TrainPunctualityWidget />
      </GridItem>
      <GridItem colSpan={2}>
        <BusFrequencyChart />
      </GridItem>
    </Grid>
        <UpcomingDeparturesTable />
    </VStack>
  );
};

export default Dashboard;
