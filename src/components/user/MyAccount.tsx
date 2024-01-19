import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Stack,
  Heading
} from '@chakra-ui/react';

function MyAccount() {
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', fullName: '', password: '' });

  const handleToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setUserInfo({ email: '', fullName: '', password: '' });
    setIsEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading mb="6">My Account</Heading>
        <Flex alignItems="center">
          <FormLabel htmlFor="edit-toggle" mb="0" mr="2">
            Edit
          </FormLabel>
          <Switch id="edit-toggle" isChecked={isEditable} onChange={handleToggle} />
        </Flex>
      </Flex>
      <Stack spacing="4" mt="4">
        <FormControl isDisabled={!isEditable}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        </FormControl>
        <FormControl isDisabled={!isEditable}>
          <FormLabel>Full Name</FormLabel>
          <Input type="text" name="fullName" value={userInfo.fullName} onChange={handleChange} />
        </FormControl>
        <FormControl isDisabled={!isEditable}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={userInfo.password} onChange={handleChange} />
        </FormControl>

        {isEditable && (
          <>
            <Button colorScheme="blue" onClick={() => console.log('Save Changes', userInfo)}>
              Save Changes
            </Button>
            <Button colorScheme="red" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default MyAccount;
