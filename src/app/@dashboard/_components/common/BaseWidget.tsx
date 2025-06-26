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
      position="relative"
      borderRadius="2xl"
      p={5}
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
      bg="rgba(255,255,255,0.35)"
      backdropFilter="blur(16px)"
      border="1.5px solid"
      borderColor="transparent"
      overflow="hidden"
    >
      <VStack align="stretch" gap={8} position="relative" zIndex={1}>
        <HStack justify="space-between">
          {typeof title === "string" ? <Text fontWeight="bold" fontSize="lg">{title}</Text> : title}
          <Box
            bg="rgba(255,255,255,0.35)"
            borderRadius="full"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(255,255,255,0.3)"
          >
            {icon}
          </Box>
        </HStack>
        {children}
      </VStack>
    </Box>
  );
} 