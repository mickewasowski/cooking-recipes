import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import NavBar from './components/misc/Navbar';
import HomePage from './components/Home';
import RecipesWrapper from './components/recepe/RecipeWrapper';
import RegisterAndLoginWrapper from './components/user/RegisterAndLoginWrapper';
import MyAccount from './components/user/MyAccount';
import NotificationsWrapper from './components/misc/NotificationsWrapper';
import RecipeDetailsWrapper from './components/recepe/details/RecipeDetailsWrapper';
import AddRecipeForm from './components/recepe/AddRecipeForm';
import EventEmitter from 'events';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from './store/root-reducer';
import { getCurrentRedirectPath } from './store/routing/routing.selector';
import { useEffect } from 'react';
import { redirectToFinish } from './store/routing/routing.action';
import { RecipesToLoad } from './utils/recipeUtils.types';

export const emitter = new EventEmitter();

const RESET_ROUTING_PATH_TIMEOUT = 1000;

function App() {
  let currentTimeout: number | null = null;
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const currentRedirectPath = useSelector((state: IRootState) => getCurrentRedirectPath(state.routing));

  useEffect(() => {
    if (currentRedirectPath) {
      navigate(currentRedirectPath);

      currentTimeout = setTimeout(() => {
        dispatcher(redirectToFinish());
      }, RESET_ROUTING_PATH_TIMEOUT) as unknown as number;

      return () => {
        if (currentTimeout) {
          clearTimeout(currentTimeout);
          currentTimeout = null;
        }
      }
    }
  }, [currentRedirectPath]);

  return (
    <>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path='recipies' element={<RecipesWrapper recipesToLoad={RecipesToLoad.All}/>} />
          <Route path='login' element={<RegisterAndLoginWrapper isRegister={false} />} />
          <Route path='register' element={<RegisterAndLoginWrapper isRegister={true}/>} />
          <Route path='myaccount' element={<MyAccount />} />
          <Route path='myrecipies' element={<RecipesWrapper recipesToLoad={RecipesToLoad.Owned}/>} />
          <Route path='addrecipe' element={<AddRecipeForm />} />
          <Route path='recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
        </Route>
      </Routes>
      <NotificationsWrapper />
    </>
  )
}

export default App
