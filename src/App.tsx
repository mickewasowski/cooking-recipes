import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

export const emitter = new EventEmitter();

function App() {
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
      <NotificationsWrapper />
    </>
  )
}

export default App
