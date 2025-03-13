import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { Filters } from "./_components/filters";
import { WidgetLoading } from "./_components/loading";

import dynamic from "next/dynamic";
import { TrainPunctualityWidgetSkeleton } from "./_components/train-punctuality-widget";
import { BusFrequencyChartSkeleton } from "./_components/bus-frequency-chart";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";

const OnTimeRateWidget = dynamic(() => import("./_components/train-on-time-rate-widget").then((mod) => mod.default));
const DailyRidersWidget = dynamic(() => import("./_components/daily-riders-widget").then((mod) => mod.default));
const ActiveBusesWidget = dynamic(() => import("./_components/active-buses-widget").then((mod) => mod.default));
const AverageSpeedWidget = dynamic(() => import("./_components/average-speed-widget").then((mod) => mod.default));
const TrainPunctualityWidget = dynamic(() => import("./_components/train-punctuality-widget.server").then((mod) => mod.TrainPunctualityWidget));
const BusFrequencyChart = dynamic(() => import("./_components/bus-frequency-chart.server").then((mod) => mod.BusFrequencyChart));

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
        {[OnTimeRateWidget, DailyRidersWidget, ActiveBusesWidget, AverageSpeedWidget].map((Widget, index) => (
          <GridItem key={index} minHeight="100px">
            <Suspense fallback={<WidgetLoading />}>
              <Widget />
            </Suspense>
          </GridItem>
        ))}
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
          <Suspense fallback={<TrainPunctualityWidgetSkeleton />}>
            <TrainPunctualityWidget />
          </Suspense>
        </GridItem>
        <GridItem 
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          overflow="hidden"
        >
          <Suspense fallback={<BusFrequencyChartSkeleton />}>
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