import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/misc/Navbar';
import HomePage from './components/Home';
import RecipesWrapper from './components/recepe/RecipeWrapper';
import LoginForm from './components/user/Login';
import RegistrationForm from './components/user/Register';
import MyAccount from './components/user/MyAccount';
import AlertBanner from './components/misc/AlertBanner';
import RecipeDetailsWrapper from './components/recepe/details/RecipeDetailsWrapper';
import { useSelector } from 'react-redux';
import { getUserError } from './store/user/user.selector';
import AddRecipeForm from './components/recepe/AddRecipeForm';

function App() {
  const [isAlertBannerVisible, setIsAlertBannerVisible] = useState(false);
  const userError = useSelector((state) => getUserError(state.user));

  useEffect(() => {
    if (userError) {
      setIsAlertBannerVisible(true);
    } else {
      setIsAlertBannerVisible(false);
    }
  }, [userError]);

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path='recipies' element={<RecipesWrapper wrapperType='all'/>} />
            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<RegistrationForm />} />
            <Route path='myaccount' element={<MyAccount />} />
            <Route path='myrecipies' element={<RecipesWrapper wrapperType='owned'/>} />
            <Route path='addrecipe' element={<AddRecipeForm />} />
            <Route path='recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {
        isAlertBannerVisible
        ? <AlertBanner message={userError} onClosed={() => setIsAlertBannerVisible(false)} />
        : null
      }
    </>
  )
}

export default App
