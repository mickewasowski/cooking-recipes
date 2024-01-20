import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/misc/Navbar';
import HomePage from './components/Home';
import RecipesWrapper from './components/recepe/RecipeWrapper';
import LoginForm from './components/user/Login';
import RegistrationForm from './components/user/Register';
import MyAccount from './components/user/MyAccount';

function App() {
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
