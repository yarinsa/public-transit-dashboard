import { Box, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BarChartSkeleton, LineChartSkeleton, MetricWidgetSkeleton } from "./_components/common/SkeletonWidgets";
import GridLayoutClient from "./_components/GridLayoutClient";
import { WidgetLoading } from "./_components/loading";
import { UpcomingDeparturesTable } from "./_components/upcoming-departures-table";
import { fetchApi } from "./_utils/api";

const OnTimeRateWidget = dynamic(() => import("./_components/train-on-time-rate-widget").then((mod) => mod.default));
const DailyRidersWidget = dynamic(() => import("./_components/daily-riders-widget").then((mod) => mod.default));
const ActiveBusesWidget = dynamic(() => import("./_components/active-buses").then((mod) => mod.default));
const AverageSpeedWidget = dynamic(() => import("./_components/average-speed-widget").then((mod) => mod.default));
const TrainPunctualityWidget = dynamic(() => import("./_components/train-punctuality").then((mod) => mod.TrainPunctualityWidget));
const BusFrequencyChart = dynamic(() => import("./_components/bus-frequency").then((mod) => mod.default));

const metricLayouts = {
  lg: [
    { i: "onTime", x: 0, y: 0, w: 1, h: 1 },
    { i: "riders", x: 1, y: 0, w: 1, h: 1 },
    { i: "buses", x: 2, y: 0, w: 1, h: 1 },
    { i: "speed", x: 3, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: "onTime", x: 0, y: 0, w: 1, h: 1 },
    { i: "riders", x: 1, y: 0, w: 1, h: 1 },
    { i: "buses", x: 0, y: 1, w: 1, h: 1 },
    { i: "speed", x: 1, y: 1, w: 1, h: 1 },
  ],
  sm: [
    { i: "onTime", x: 0, y: 0, w: 1, h: 1 },
    { i: "riders", x: 0, y: 1, w: 1, h: 1 },
    { i: "buses", x: 0, y: 2, w: 1, h: 1 },
    { i: "speed", x: 0, y: 3, w: 1, h: 1 },
  ],
  xs: [
    { i: "onTime", x: 0, y: 0, w: 1, h: 1 },
    { i: "riders", x: 0, y: 1, w: 1, h: 1 },
    { i: "buses", x: 0, y: 2, w: 1, h: 1 },
    { i: "speed", x: 0, y: 3, w: 1, h: 1 },
  ],
};

const chartLayouts = {
  lg: [
    { i: "punctuality", x: 0, y: 0, w: 1, h: 2 },
    { i: "busfreq", x: 1, y: 0, w: 1, h: 2 },
  ],
  md: [
    { i: "punctuality", x: 0, y: 0, w: 1, h: 2 },
    { i: "busfreq", x: 1, y: 0, w: 1, h: 2 },
  ],
  sm: [
    { i: "punctuality", x: 0, y: 0, w: 1, h: 1 },
    { i: "busfreq", x: 0, y: 1, w: 1, h: 1 },
  ],
  xs: [
    { i: "punctuality", x: 0, y: 0, w: 1, h: 1 },
    { i: "busfreq", x: 0, y: 1, w: 1, h: 1 },
  ],
};

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };
const metricCols = { lg: 4, md: 2, sm: 1, xs: 1 };
const chartCols = { lg: 2, md: 2, sm: 1, xs: 1 };

const Dashboard = async () => {
  const flags = await fetchApi<{ui_departures_table_visible: boolean}>("flags");

  return (
    <VStack gap={4} align="stretch" padding={4} width="100%">
      {/* <Filters /> */}
      {/* Metric cards section - responsive layout */}
      <GridLayoutClient
        className="metric-layout"
        layouts={metricLayouts}
        breakpoints={breakpoints}
        cols={metricCols}
        rowHeight={120}
        style={{ width: "100%" }}
      >
        <div key="onTime">
          <Suspense fallback={<MetricWidgetSkeleton />}>
            <OnTimeRateWidget />
          </Suspense>
        </div>
        <div key="riders">
          <Suspense fallback={<MetricWidgetSkeleton />}>
            <DailyRidersWidget />
          </Suspense>
        </div>
        <div key="buses">
          <Suspense fallback={<MetricWidgetSkeleton />}>
            <ActiveBusesWidget />
          </Suspense>
        </div>
        <div key="speed">
          <Suspense fallback={<MetricWidgetSkeleton />}>
            <AverageSpeedWidget />
          </Suspense>
        </div>
      </GridLayoutClient>
      {/* Charts section - responsive layout */}
      <GridLayoutClient
        className="chart-layout"
        layouts={chartLayouts}
        breakpoints={breakpoints}
        cols={chartCols}
        rowHeight={320}
        style={{ width: "100%" }}
      >
        <div key="punctuality">
          <Suspense fallback={<LineChartSkeleton />}>
            <TrainPunctualityWidget />
          </Suspense>
        </div>
        <div key="busfreq">
          <Suspense fallback={<BarChartSkeleton />}> 
            <BusFrequencyChart />
          </Suspense>
        </div>
      </GridLayoutClient>
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