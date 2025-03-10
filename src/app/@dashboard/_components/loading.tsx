import { Box } from "@chakra-ui/react";

// Simple loading component
export function WidgetLoading() {
  return (
    <Box
      bg="bg.subtle"
      boxShadow="md"
      borderRadius="md"
      p={4}
      height="100%"
      animation="pulse 2s infinite" />
  );
}
