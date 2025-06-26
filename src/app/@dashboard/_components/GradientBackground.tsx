import { Box } from "@chakra-ui/react";

const GradientBackground = () => (
  <>
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      zIndex={0}
      style={{
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 10s ease-in-out infinite"
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgGradient: "linear(to-br, rgba(255,255,255,0.2), rgba(255,255,255,0.1))"
      }}
    />
    <style>{`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  </>
);

export default GradientBackground; 