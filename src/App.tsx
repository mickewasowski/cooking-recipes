import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { lazy, Suspense } from 'react';
import EventEmitter from 'events';
import { RecipesToLoad } from './utils/recipeUtils.types';
import ErrorPage from './components/misc/ErrorPage';
import Loading from './components/misc/LoadingSpinner';
const NavBar = lazy(() => import('./components/misc/Navbar'));
const HomePage = lazy(() => import('./components/Home'));
const RecipesWrapper = lazy(() => import('./components/recipe/RecipeWrapper'));
const RegisterAndLoginWrapper = lazy(() => import('./components/user/RegisterAndLoginWrapper'));
const MyAccount = lazy(() => import('./components/user/MyAccount'));
const NotificationsWrapper = lazy(() => import('./components/misc/NotificationsWrapper'));
const RecipeDetailsWrapper = lazy(() => import('./components/recipe/RecipeDetailsWrapper'));
const AddRecipeForm = lazy(() => import('./components/recipe/AddRecipe'));

export const emitter = new EventEmitter();

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path='allRecipes' element={<RecipesWrapper recipesToLoad={RecipesToLoad.All}/>} />
            <Route path='login' element={<RegisterAndLoginWrapper isRegister={false} />} />
            <Route path='register' element={<RegisterAndLoginWrapper isRegister={true}/>} />
            <Route path='myaccount' element={<MyAccount />} />
            <Route path='ownedRecipes' element={<RecipesWrapper recipesToLoad={RecipesToLoad.Owned}/>} />
            <Route path='addrecipe' element={<AddRecipeForm />} />
            <Route path='latestAdded/recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
            <Route path='allRecipes/recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
            <Route path='ownedRecipes/recipeDetails/:recipeId' element={<RecipeDetailsWrapper />} />
            <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
        <NotificationsWrapper />
      </Suspense>
    </>
  )
}

export default App
