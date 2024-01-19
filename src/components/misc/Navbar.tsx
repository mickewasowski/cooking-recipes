import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function NavigationBar() {
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  const [isLoggedIn, setIsLoggedIn] = useState(false); //TODO: get this from the Redux store

  const onLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: use redux saga for logout
  }

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: use redux saga for login
  }

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={() => console.log('Home')}>Home</MenuItem>
      <MenuItem onClick={() => console.log('Recipes')}>Recipes</MenuItem>
      {isLoggedIn ? (
        <>
          <MenuItem onClick={() => console.log('My Account')}>My Account</MenuItem>
          <MenuItem onClick={() => console.log('My Recipes')}>My Recipes</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </>
      ) : (
        <MenuItem onClick={onLogin}>Login</MenuItem>
      )}
    </>
  );

  return (
    <Flex px="4" py="2" align="center" bg="gray.100" position="sticky" top="0" width="100%" zIndex="1">
      <Box>Logo</Box>
      <Spacer />
      {isSmallScreen ? (
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            {renderMenuItems()}
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button variant="ghost" mx="2">Home</Button>
          <Button variant="ghost" mx="2">Recipes</Button>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" mx="2">My Account</Button>
              <Button variant="ghost" mx="2">My Recipes</Button>
              <Button mx="2" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <Button mx="2" onClick={onLogin}>Login</Button>
          )}
        </>
      )}
    </Flex>
  );
}

export default NavigationBar;
