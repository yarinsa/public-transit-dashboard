import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

type BaseWidgetProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function BaseWidget({ title, icon, children }: BaseWidgetProps) {
  return (
    <Box
      bg={`bg.subtle`}
      boxShadow="md"
      borderRadius="md"
      p={4}
    >
      <VStack align="stretch">
        <HStack justify="space-between">
          <Text>{title}</Text>
          {icon}
        </HStack>
        {children}
      </VStack>
    </Box>
  );
} 