'use client';

import { Logo } from '@/components/logo';
import { useColorModeValue } from '@/components/ui/color-mode';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Separator,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
// Create motion versions of Chakra UI components
const MotionContainer = motion(Container);
const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionInput = motion(Input);
const MotionButton = motion(Button);
const MotionSeparator = motion(Separator);
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);


const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Colors for theme consistency
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = new URL(`/api/auth/login`, process.env.NEXT_PUBLIC_API_URL);
      url.searchParams.set('email', email);
      const response = await fetch(url, {
        method: 'GET',
      });
      
      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };


  return (
    <>
      {/* Vibrant Animated Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={0}
        style={{
          background: "linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease-in-out infinite"
        }}
      />
      
      {/* Override body background for login page */}
      <style>{`
        body {
          background: transparent !important;
        }
      `}</style>
      
      {/* Floating Elements */}
      <Box
        position="fixed"
        top="10%"
        left="15%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="rgba(255,255,255,0.1)"
        filter="blur(40px)"
        zIndex={1}
        style={{
          animation: "float1 6s ease-in-out infinite"
        }}
      />
      <Box
        position="fixed"
        top="60%"
        right="10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="rgba(255,255,255,0.08)"
        filter="blur(60px)"
        zIndex={1}
        style={{
          animation: "float2 8s ease-in-out infinite"
        }}
      />
      <Box
        position="fixed"
        bottom="20%"
        left="20%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="rgba(255,255,255,0.12)"
        filter="blur(30px)"
        zIndex={1}
        style={{
          animation: "float3 7s ease-in-out infinite"
        }}
      />

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, -20px) rotate(180deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -40px) rotate(90deg); }
          50% { transform: translate(-30px, -20px) rotate(180deg); }
          75% { transform: translate(10px, 30px) rotate(270deg); }
        }
      `}</style>

      <MotionContainer 
        margin={`auto`} 
        maxW="md" 
        py={{ base: '12', md: '24' }} 
        px={{base: 4, md: 8}}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        position="relative"
        zIndex={10}
      >
      <MotionBox 
        variants={itemVariants}
        p={8}
        borderRadius="2xl"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
        bg="rgba(255,255,255,0.35)"
        backdropFilter="blur(16px)"
        border="1.5px solid"
        borderColor="transparent"
        overflow="hidden"
        position="relative"
      >
        <MotionStack gap="8" variants={containerVariants}>
          <MotionFlex justifyContent="center" mb={4}>
            <Logo isMinimal size="80px" />
          </MotionFlex>
          
          <VStack gap="4">
            <MotionHeading size="lg" textAlign="center" variants={itemVariants}>Sign in to your account</MotionHeading>
            <MotionText color="fg.muted" fontSize="sm" textAlign="center" variants={itemVariants}>
              Welcome back! Please sign in to continue.
            </MotionText>
          </VStack>
          
          <MotionStack margin={`auto`} gap="6" as="form" onSubmit={handleSubmit} w="100%" variants={itemVariants}>
            <Box position="relative">
              <MotionInput
                px={2}
                py={6}
                id="email"
                type="email"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variants={itemVariants}
                whileFocus={{ boxShadow: `0 0 0 3px ${accentColor}40` }}
                fontSize="md"
                borderRadius="md"
              />
            </Box>
            
            <MotionButton 
              type="submit" 
              colorScheme="blue" 
              size="lg" 
              width="full"
              py={6}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
              borderRadius="md"
              fontWeight="bold"
            >
              {isLoading ? (
                <Spinner size="sm" mr={2} />
              ) : null}
              Continue <BsArrowRight style={{ marginLeft: '8px' }} />
            </MotionButton>
          </MotionStack>

          <MotionSeparator variant="dashed" variants={itemVariants} />

          <MotionText textStyle="sm" color="fg.muted" textAlign="center" fontSize="xs" variants={itemVariants}>
            By continuing, you agree to our <Link href="/terms" color={accentColor}>Terms of Service</Link> and <Link href="/privacy" color={accentColor}>Privacy Policy</Link>.
          </MotionText>
        </MotionStack>
      </MotionBox>
    </MotionContainer>
    </>
  );
};

export default Login;
