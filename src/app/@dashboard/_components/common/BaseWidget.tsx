import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

type BaseWidgetProps = {
  title: ReactNode | string;
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
      <VStack align="stretch" gap={8}>
        <HStack justify="space-between">
          {typeof title === "string" ? <Text>{title}</Text> : title}
          {icon}
        </HStack>
        {children}
      </VStack>
    </Box>
  );
} 