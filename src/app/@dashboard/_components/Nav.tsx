import { Box, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { LuTrainFront } from "react-icons/lu";
import { LogoutButton } from "./LogoutButton";

const Nav = () => {
  return (
    <Box
      as="nav"
      w="calc(100% - 32px)"
      position="sticky"
      top={4}
      left={4}
      right={0}
      zIndex={1000}
      bg="rgba(255, 255, 255, 0.35)"
      boxShadow="0 4px 24px rgba(0,0,0,0.08)"
      backdropFilter="blur(8px)"
      borderRadius="xl"
      px={6}
      py={3}
      mb={2}
    >
      <Flex align="center">
        <HStack gap={4}>
          <Box
            bgGradient="linear(to-br, teal.400, blue.400)"
            borderRadius="full"
            p={2}
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LuTrainFront size={28} color="gray.800" />
          </Box>
          <Heading size="md" color="gray.800" fontWeight="bold" letterSpacing="tight">
            Transit Metrics
          </Heading>
        </HStack>
        <Spacer />
        <LogoutButton />
      </Flex>
    </Box>
  );
};

export default Nav; 