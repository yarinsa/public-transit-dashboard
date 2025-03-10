import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
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
    <VStack gap={4} align="stretch" padding={4} width="100%">
      <Filters />
      
      {/* Metric cards section - responsive layout */}
      <Grid 
        gap={4} 
        templateColumns={{
          base: "1fr",                        // Mobile: 1 column
          sm: "repeat(2, 1fr)",               // Tablet: 2 columns
          lg: "repeat(4, 1fr)"                // Desktop: 4 columns
        }}
      >
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
      </Grid>
      
      {/* Charts section - responsive layout */}
      <Grid 
        gap={4} 
        templateColumns={{
          base: "1fr",                        // Mobile: 1 column
          lg: "repeat(2, 1fr)"                // Desktop: 2 columns
        }}
      >
        <GridItem 
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          overflow="hidden"
        >
          <TrainPunctualityWidget />
        </GridItem>
        <GridItem 
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          overflow="hidden"
        >
          <BusFrequencyChart />
        </GridItem>
      </Grid>
      
      {/* Table section - full width at all screen sizes */}
      <Box 
        width="100%" 
        overflowX="auto"
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
      >
        <UpcomingDeparturesTable />
      </Box>
    </VStack>
  );
};

export default Dashboard;