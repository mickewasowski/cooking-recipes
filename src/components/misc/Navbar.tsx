import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

function NavigationBar() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: IRootState) => getCurrentUser(state.user));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const onLogout = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(signOutStart());
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuClasses = classNames({
    isMenuShowing: isMenuOpen
  });

  return (
    <>
      <nav className='navigation-wrapper'>
        <span id={isMenuOpen ? 'menu-close' : 'menu-button'} onClick={toggleMenu}></span>
        <ul className={menuClasses}>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/recipies'}>All Recipes</NavLink></li>
          <li><NavLink to={'/addrecipe'}>Add recipe</NavLink></li>
          <li><NavLink to={'/myrecipies'}>My recipes</NavLink></li>
          <li><NavLink to={'/myaccount'}>Account</NavLink></li>
          {
            !isLoggedIn
            ? (
              <>
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/register'}>Register</NavLink></li>
              </>
            ) : null
          }
          {
            isLoggedIn
            ? (
              <li onClick={(event) => onLogout(event)}><NavLink to={''}>Logout</NavLink></li>
            ) : null
          }
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavigationBar;
