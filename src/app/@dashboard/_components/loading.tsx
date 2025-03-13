import { Box } from "@chakra-ui/react";

// Simple loading component
type Props = {
  height?: string;
  width?: string;
}

export function WidgetLoading({ height = "100%", width = "100%" }: Props) {
  return (
    <Box
      bg="bg.subtle"
      boxShadow="md"
      borderRadius="md"
      p={4}
      height={height}
      width={width}
      animation="pulse 2s infinite" />
  );
}
