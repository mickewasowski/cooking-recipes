import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
  Box,
  Heading
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart } from '../../store/user/user.action';
import { getSuccessMessage } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';

type ErrorsType = {
    email?: string;
    fullName?: string;
    confirmPassword?: string;
}

function RegistrationForm() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((state: IRootState) => getSuccessMessage(state.user));
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ErrorsType>({});

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newErrors: ErrorsType = {};
    if (!isValidEmail(email)) newErrors.email = 'Invalid email address';
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle registration logic here
      dispatcher(registerStart({ email, fullName, password }));
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  }, [successMessage]);

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6" textAlign="center">Register</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl id="email" isInvalid={!!(errors.email)} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="fullName" isInvalid={!!(errors.fullName)} isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <FormErrorMessage>{errors.fullName}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={!!(errors.confirmPassword)} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default RegistrationForm;
