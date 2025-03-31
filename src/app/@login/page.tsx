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
  const bgColor = useColorModeValue(`white`, `gray.800`)
  const borderColor = useColorModeValue('gray.200', 'gray.700');
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
    <MotionContainer 
      margin={`auto`} 
      maxW="md" 
      py={{ base: '12', md: '24' }} 
      px={{base: 4, md: 8}}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MotionBox 
        variants={itemVariants}
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
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
  );
};

export default Login;
