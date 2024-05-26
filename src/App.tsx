import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import { lazy, Suspense } from 'react';
import EventEmitter from 'events';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from './store/root-reducer';
import { getCurrentRedirectPath } from './store/routing/routing.selector';
import { useEffect } from 'react';
import { redirectToFinish } from './store/routing/routing.action';
import { RecipesToLoad } from './utils/recipeUtils.types';
const NavBar = lazy(() => import('./components/misc/Navbar'));
const HomePage = lazy(() => import('./components/Home'));
const RecipesWrapper = lazy(() => import('./components/recepe/RecipeWrapper'));
const RegisterAndLoginWrapper = lazy(() => import('./components/user/RegisterAndLoginWrapper'));
const MyAccount = lazy(() => import('./components/user/MyAccount'));
const NotificationsWrapper = lazy(() => import('./components/misc/NotificationsWrapper'));
const RecipeDetailsWrapper = lazy(() => import('./components/recepe/details/RecipeDetailsWrapper'));
const AddRecipeForm = lazy(() => import('./components/recepe/AddRecipeForm'));

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  )
}

export default App
