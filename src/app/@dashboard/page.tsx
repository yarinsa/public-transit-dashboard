import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { Filters } from "./_components/filters";
import { WidgetLoading } from "./_components/loading";

import dynamic from "next/dynamic";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";
import { BarChartSkeleton, LineChartSkeleton, MetricWidgetSkeleton } from "./_components/common/SkeletonWidgets";
import { fetchApi } from "./_utils/api";
const OnTimeRateWidget = dynamic(() => import("./_components/train-on-time-rate-widget").then((mod) => mod.default));
const DailyRidersWidget = dynamic(() => import("./_components/daily-riders-widget").then((mod) => mod.default));
const ActiveBusesWidget = dynamic(() => import("./_components/active-buses").then((mod) => mod.default));
const AverageSpeedWidget = dynamic(() => import("./_components/average-speed-widget").then((mod) => mod.default));
const TrainPunctualityWidget = dynamic(() => import("./_components/train-punctuality").then((mod) => mod.TrainPunctualityWidget));
const BusFrequencyChart = dynamic(() => import("./_components/bus-frequency").then((mod) => mod.default));

const Dashboard = async () => {
  const flags = await fetchApi<{ui_departures_table_visible: boolean}>("flags");

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
          <GridItem key={index}>
            <Suspense fallback={<MetricWidgetSkeleton />}>
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
        {[[TrainPunctualityWidget,LineChartSkeleton],[BusFrequencyChart,BarChartSkeleton]].map(([Widget, Skeleton], index) => (
          <GridItem 
            key={index}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            overflow="hidden"
          >
            <Suspense fallback={<Skeleton />}>
              <Widget />
            </Suspense>
          </GridItem>
        ))}
      </Grid>
      {/* Table section - full width at all screen sizes */}
      {flags.ui_departures_table_visible && (
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
      )}
    </VStack>
  );
};

export default Dashboard;