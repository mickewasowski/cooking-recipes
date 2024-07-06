import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { setCurrentUser } from '../../store/user/user.slice';

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
    dispatch(setCurrentUser(null));
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
          <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/'}>Home</NavLink></li>
          <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/allRecipes'}>All Recipes</NavLink></li>
          
          {
            !user
            ? (
              <>
                <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/login'}>Login</NavLink></li>
                <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/register'}>Register</NavLink></li>
              </>
            ) : null
          }
          {
            user
            ? (
              <>
                <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/addrecipe'}>Add recipe</NavLink></li>
                <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/ownedRecipes'}>My recipes</NavLink></li>
                <li onClick={() => setIsMenuOpen(false)}><NavLink to={'/myaccount'}>Account</NavLink></li>
                <li onClick={(event) => {
                  onLogout(event);
                  setIsMenuOpen(false);
                }}><NavLink to={''}>Logout</NavLink></li>
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
