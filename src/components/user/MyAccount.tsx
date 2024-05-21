import React, { useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { editUserStart } from '../../store/user/user.action';

function MyAccount() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => getCurrentUser(state.user));
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: currentUser?.email, fullName: currentUser?.fullName, password: null, newPassword: null });

  const handleToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setUserInfo({ ...userInfo, password: null, newPassword: null });
    setIsEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    dispatch(editUserStart({ ...userInfo, token: currentUser?.token }));
  }

  return (
    null
    // <Box maxW="sm" mx="auto" mt="10">
    //   <Flex justifyContent="space-between" alignItems="center">
    //     <Heading mb="6">My Account</Heading>
    //     <Flex alignItems="center">
    //       <FormLabel htmlFor="edit-toggle" mb="0" mr="2">
    //         Edit
    //       </FormLabel>
    //       <Switch id="edit-toggle" isChecked={isEditable} onChange={handleToggle} />
    //     </Flex>
    //   </Flex>
    //   <Stack spacing="4" mt="4">
    //     <FormControl isDisabled={!isEditable}>
    //       <FormLabel>Email</FormLabel>
    //       <Input type="email" name="email" value={userInfo.email} onChange={handleChange} />
    //     </FormControl>
    //     <FormControl isDisabled={!isEditable}>
    //       <FormLabel>Full Name</FormLabel>
    //       <Input type="text" name="fullName" value={userInfo.fullName} onChange={handleChange} />
    //     </FormControl>
    //     <FormControl isDisabled={!isEditable} isRequired>
    //       <FormLabel>Password</FormLabel>
    //       <Input type="password" name="password" value={userInfo.password} onChange={handleChange} />
    //     </FormControl>
    //     <FormControl isDisabled={!isEditable}>
    //       <FormLabel>New Password</FormLabel>
    //       <Input type="password" name="newPassword" value={userInfo.newPassword} onChange={handleChange} />
    //     </FormControl>

    //     {isEditable && (
    //       <>
    //         <Button colorScheme="blue" onClick={handleUpdateUser}>
    //           Save Changes
    //         </Button>
    //         <Button colorScheme="red" onClick={handleCancel}>
    //           Cancel
    //         </Button>
    //       </>
    //     )}
    //   </Stack>
    // </Box>
  );
}

const EnhancedComponent = isAuth(MyAccount);

export default EnhancedComponent;
