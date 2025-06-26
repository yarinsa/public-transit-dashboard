import { VStack, Box } from "@chakra-ui/react";
import Nav from "./_components/Nav";
import GradientBackground from "./_components/GradientBackground";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position="relative" minH="100vh" height="100vh">
      <GradientBackground />
      <VStack align="stretch" gap={4} position="relative" zIndex={1}>
        <Nav />
        {children}
      </VStack>
    </Box>
  );
};

export default DashboardLayout;
