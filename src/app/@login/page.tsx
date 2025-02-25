'use client';

import {
    Button,
    Container,
    Heading,
    Input,
    Link,
    Separator,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/auth/login?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });
      
      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container margin={`auto`} maxW="md" py={{ base: '16', md: '32' }} px={{base: 4, md: 0}}>
      <Stack gap="8">
        <VStack gap="12">
          <Heading size="2xl">Sign in to your account</Heading>
          <Text color="fg.muted">Welcome back! Please sign in to continue.</Text>
        </VStack>
        <Stack margin={`auto`} gap="6" as="form" onSubmit={handleSubmit} w="100%">
            <Stack gap="6">
              <Input
                px={2}
                id="email"
                type="email"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" colorScheme="blue" size="lg" width="full">
                Continue <BsArrowRight />
              </Button>
            </Stack>
        </Stack>



        <Separator variant="dashed" />

        <Text textStyle="sm" color="fg.muted" textAlign="center">
          By continuing, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </Text>
      </Stack>
    </Container>
  );
};

export default Login;
