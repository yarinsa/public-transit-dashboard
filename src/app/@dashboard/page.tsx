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
    <VStack gap={4} align="stretch" padding={{ base: 2, md: 4 }}>
      <Box overflowX={{ base: "auto", md: "visible" }} width="100%">
        <Filters />
      </Box>
      
      {/* Small metric widgets - fully responsive with different layouts */}
      <Grid 
        gap={4} 
        templateColumns={{
          base: "1fr",                        // Mobile: 1 column
          sm: "repeat(2, 1fr)",               // Small tablets: 2 columns
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
          colSpan={1}
          minH="350px"                        // Ensure minimum height for charts
        >
          <TrainPunctualityWidget />
        </GridItem>
        <GridItem 
          colSpan={1}
          minH="350px"                        // Ensure minimum height for charts
        >
          <BusFrequencyChart />
        </GridItem>
      </Grid>
      
      {/* Table section - full width at all screen sizes */}
      <Box width="100%" overflowX="auto">
        <UpcomingDeparturesTable />
      </Box>
    </VStack>
  );
};

export default Dashboard;