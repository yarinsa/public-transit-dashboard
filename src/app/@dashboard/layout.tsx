import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { LogoutButton } from "./_components/LogoutButton";
import { LuTrainFront } from "react-icons/lu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack align="stretch" gap={4}>
    <HStack justify="space-between" align="start" bg={`bg`} boxShadow="md" borderRadius="md" p={4}>

        <HStack align="center" gap={4}>
        <LuTrainFront size={`24px`} />
        <VStack align="start" gap={0}>

        <Heading size="lg">Transit Metrics</Heading>
        </VStack>
        </HStack>
        <LogoutButton />
    </HStack>
      {children}
    </VStack>
  );
};

export default DashboardLayout;
