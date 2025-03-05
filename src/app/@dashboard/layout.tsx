import { Heading, HStack, VStack } from "@chakra-ui/react";
import { LuTrainFront } from "react-icons/lu";
import { LogoutButton } from "./_components/LogoutButton";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack align="stretch" gap={4} >
    <HStack justify="space-between" align="center" bg={`bg`} boxShadow="md" borderRadius="md" p={4}>

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
