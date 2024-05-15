import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  const dispatch = useDispatch();
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
    dispatch(signOutStart());
  }

  return (
    <>
      <nav className='navigation-wrapper'>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/recipies'}>All Recipes</NavLink></li>
          <li><NavLink to={'/login'}>Login</NavLink></li>
          <li><NavLink to={'/register'}>Register</NavLink></li>
          <li onClick={() => onLogout}><NavLink to={''}>Logout</NavLink></li>
          <li><NavLink to={'/myaccount'}>Account</NavLink></li>
          <li><NavLink to={'/myrecipies'}>My recipes</NavLink></li>
          <li><NavLink to={'/addrecipe'}>Add recipe</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavigationBar;
