import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './components/misc/Navbar'
import RecipeCard from './components/recepe/RecipeCard';
import LoginForm from './components/user/Login';
import SearchBar from './components/misc/SearchBar';

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <RecipeCard id='uytyfgfh' imageUrl='example.com/image' title='test title' description='vdhjt hvfvghfjnvfghjf  hvdcfgvhs gfhdvfvg fgvfg' />
      <LoginForm />
      <SearchBar />
    </ChakraProvider>
  )
}

export default App
