import React, { useEffect, useState } from 'react';
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
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: IRootState) => getCurrentUser(state.user));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const onLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: use redux saga for logout
    dispatch(signOutStart());
  }

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
      <MenuItem onClick={() => navigate('recipies')}>Recipes</MenuItem>
      {isLoggedIn ? (
        <>
          <MenuItem onClick={() => navigate('myaccount')}>My Account</MenuItem>
          <MenuItem onClick={() => navigate('myrecipies')}>My Recipes</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </>
      ) : (
        <MenuItem onClick={() => navigate('login')}>Login</MenuItem>
      )}
    </>
  );

  return (
    <>
      <Flex px="4" py="2" color='#FEECEB' marginBottom='5' align="center" justifyContent='flex-end' bg="#191815" position="sticky" top="0" width="100%" zIndex="1">
        {isSmallScreen ? (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} />
            <MenuList>
              {renderMenuItems()}
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={() => navigate('/')}>Home</Button>
            <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={() => navigate('recipies')}>Recipes</Button>
            {isLoggedIn ? (
              <>
                <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={() => navigate('myaccount')}>My Account</Button>
                <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={() => navigate('myrecipies')}>My Recipes</Button>
                <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={() => navigate('addrecipe')}>Add Recipe</Button>
                <Button color='#F1FAFF' variant="ghost" _hover={{ bg: '#bfdaa41a' }} mx="2" onClick={onLogout}>Logout</Button>
              </>
            ) : (
              <Button color='#F1FAFF' variant="ghost" mx="2" _hover={{ bg: '#bfdaa41a' }} onClick={() => navigate('login')}>Login</Button>
            )}
          </>
        )}
      </Flex>
      <Outlet />
    </>
  );
}

export default NavigationBar;
