import { Box, Link as ChakraLink } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const GlassyFooter = () => (
  <Box
    as="footer"
    position="fixed"
    bottom={4}
    left="50%"
    transform="translateX(-50%)"
    zIndex={1000}
    bg="rgba(255,255,255,0.35)"
    boxShadow="0 4px 24px rgba(0,0,0,0.08)"
    backdropFilter="blur(8px)"
    borderRadius="xl"
    px={5}
    py={2}
    gap={3}
    border="1px solid rgba(22,163,74,0.15)"
    fontWeight="medium"
    fontSize="sm"
    color="#222"
  >
    <ChakraLink
      as={Link}
      href="https://www.gov.il"
      target="_blank"
      display="flex"
      alignItems="center"
    >
      <span>Data provided by</span>
      <Image
        src="/Logo_gov.il.png"
        alt="gov.il logo"
        height={12}
        width={30}
        style={{
          marginLeft: 4,
          marginRight: 4,
          objectFit: "contain",
          borderRadius: 4,
        }}
      />
    </ChakraLink>
  </Box>
);

export default GlassyFooter;
