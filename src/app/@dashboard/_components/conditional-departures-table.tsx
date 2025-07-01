import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import { UpcomingDeparturesTable } from "./upcoming-departures-table";
import { WidgetLoading } from "./loading";
import { fetchApi } from "../_utils/api";

const ConditionalDeparturesTable = async () => {
  const flags = await fetchApi<{ui_departures_table_visible: boolean}>("flags");
  
  if (!flags.ui_departures_table_visible) {
    return null;
  }

  return (
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
  );
};

export default ConditionalDeparturesTable; 