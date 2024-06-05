import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useOutsideClick } from '../hooks/useOutsideClick';

function NavigationBar() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: IRootState) => getCurrentUser(state.user));

  const ref = useOutsideClick(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

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
      <nav className='navigation-wrapper' ref={ref}>
        <span id={isMenuOpen ? 'menu-close' : 'menu-button'} onClick={toggleMenu}></span>
        <ul className={menuClasses}>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/recipies'}>All Recipes</NavLink></li>
          
          {
            !user
            ? (
              <>
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/register'}>Register</NavLink></li>
              </>
            ) : null
          }
          {
            user
            ? (
              <>
                <li><NavLink to={'/addrecipe'}>Add recipe</NavLink></li>
                <li><NavLink to={'/myrecipies'}>My recipes</NavLink></li>
                <li><NavLink to={'/myaccount'}>Account</NavLink></li>
                <li onClick={(event) => onLogout(event)}><NavLink to={''}>Logout</NavLink></li>
              </>
            ) : null
          }
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavigationBar;
