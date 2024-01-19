import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './components/misc/Navbar'
import RecipeCard from './components/recepe/RecipeCard';
import LoginForm from './components/user/Login';
import SearchBar from './components/misc/SearchBar';
import RegistrationForm from './components/user/Register';
import MyAccount from './components/user/MyAccount';

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      {/* <RecipeCard id='uytyfgfh' imageUrl='example.com/image' title='test title' description='vdhjt hvfvghfjnvfghjf  hvdcfgvhs gfhdvfvg fgvfg' />
      <LoginForm />
      <SearchBar />
      <RegistrationForm /> */}
      <MyAccount />

    </ChakraProvider>
  )
}

export default App
