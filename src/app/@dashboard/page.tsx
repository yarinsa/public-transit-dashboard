import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { ActiveBusesWidget } from "./_components/active-buses-widget";
import { AverageSpeedWidget } from "./_components/average-speed-widget";
import { BusFrequencyChart } from "./_components/bus-frequency-chart";
import { DailyRidersWidget } from "./_components/daily-riders-widget";
import { OnTimeRateWidget } from "./_components/train-on-time-rate-widget";
import { TrainPunctualityWidget } from "./_components/train-punctuality-widget";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";
import { Filters } from "./_components/filters";

// Simple loading component
function WidgetLoading() {
  return (
    <Box
      bg="bg.subtle"
      boxShadow="md"
      borderRadius="md"
      p={4}
      height="100px"
      animation="pulse 2s infinite"
    />
  );
}

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
          <Suspense fallback={<WidgetLoading />}>
            <OnTimeRateWidget />
          </Suspense>
        </GridItem>
        <GridItem>
          <Suspense fallback={<WidgetLoading />}>
            <DailyRidersWidget />
          </Suspense>
        </GridItem>
        <GridItem>
          <Suspense fallback={<WidgetLoading />}>
            <ActiveBusesWidget />
          </Suspense>
        </GridItem>
        <GridItem>
          <Suspense fallback={<WidgetLoading />}>
            <AverageSpeedWidget />
          </Suspense>
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
          <Suspense fallback={<WidgetLoading />}>
            <TrainPunctualityWidget />
          </Suspense>
        </GridItem>
        <GridItem 
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          overflow="hidden"
        >
          <Suspense fallback={<WidgetLoading />}>
            <BusFrequencyChart />
          </Suspense>
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
        <Suspense fallback={<WidgetLoading />}>
          <UpcomingDeparturesTable />
        </Suspense>
      </Box>
    </VStack>
  );
};

export default Dashboard;