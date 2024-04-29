import React, { useEffect } from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import SearchBar from './misc/SearchBar'; // Import your SearchBar component
import RecipeCard from './recepe/RecipeCard'; // Import your RecipeCard component
import RecipeWrapper from './recepe/RecipeWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/root-reducer';
import { getLatestRecipes } from '../store/recipe/recipe.selector';
import { getLatestRecipiesStart } from '../store/recipe/recipe.action';


function HomePage() {
  const dispatcher = useDispatch();
  const allRecipies = useSelector((state: IRootState) => getLatestRecipes(state.recipe));

  useEffect(() => {
    dispatcher(getLatestRecipiesStart());
  }, []);

  return (
    <Box>
      <Box p="4">
        <Heading as="h1" size="xl" mb="6">Welcome to MyRecipes!</Heading>
        <SearchBar />
        <Heading as="h2" size="lg" mt="10" mb="6">Popular Recipes</Heading>
        <div>
          {
            allRecipies?.map(recipe => (
              <RecipeCard key={recipe?.id} {...recipe} />
            ))
          }
        </div>
      </Box>
    </Box>
  );
}

export default HomePage;
