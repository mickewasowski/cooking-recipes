import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import NavBar from './components/misc/Navbar';
import HomePage from './components/Home';
import RecipesWrapper from './components/recepe/RecipeWrapper';
import RegisterAndLoginWrapper from './components/user/RegisterAndLoginWrapper';
import MyAccount from './components/user/MyAccount';
import AlertBanner from './components/misc/AlertBanner';
import RecipeDetailsWrapper from './components/recepe/details/RecipeDetailsWrapper';
import { useSelector } from 'react-redux';
import { getUserError, getSuccessMessage } from './store/user/user.selector';
import AddRecipeForm from './components/recepe/AddRecipeForm';
import { IRootState } from './store/root-reducer';

function App() {
  const [isAlertBannerVisible, setIsAlertBannerVisible] = useState(false);
  const userError = useSelector((state: IRootState) => getUserError(state.user));
  const userSuccessRegisterMessage = useSelector((state: IRootState) => getSuccessMessage(state.user));

  useEffect(() => {
    if (userError || userSuccessRegisterMessage) {
      setIsAlertBannerVisible(true);
    } else {
      setIsAlertBannerVisible(false);
    }
  }, [userError, userSuccessRegisterMessage]);

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path='recipies' element={<RecipesWrapper wrapperType='all'/>} />
            <Route path='login' element={<RegisterAndLoginWrapper isRegister={false} />} />
            <Route path='register' element={<RegisterAndLoginWrapper isRegister={true}/>} />
            <Route path='myaccount' element={<MyAccount />} />
            <Route path='myrecipies' element={<RecipesWrapper wrapperType='owned'/>} />
            <Route path='addrecipe' element={<AddRecipeForm />} />
            <Route path='recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {
        isAlertBannerVisible
        ? <AlertBanner message={userError || userSuccessRegisterMessage} onClosed={() => setIsAlertBannerVisible(false)} />
        : null
      }
    </>
  )
}

export default App
