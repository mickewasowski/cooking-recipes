import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Heading,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithEmail } from '../../store/user/user.action';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(email === '');
    setPasswordError(password === '');
    if (email !== '' && password !== '') {
      // Handle the form submission logic here
    }

    dispatch(signInWithEmail({ email, password }));
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6" textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl id="email" isInvalid={isEmailError}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
            {isEmailError ? (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            ) : (
              <FormHelperText>Enter your email address to sign in.</FormHelperText>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={isPasswordError}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
            {isPasswordError ? (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            ) : (
              <FormHelperText>Enter your password to sign in.</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
            Sign in
          </Button>
          <Button variant="link" onClick={() => navigate('/register')} mt="4">
            Don't have an account? Sign up now.
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default LoginForm;
