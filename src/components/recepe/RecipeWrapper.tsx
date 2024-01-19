import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RecipeCard from './RecipeCard'; // Import your RecipeCard component

const RECIPES_PER_LOAD = 10;

type Recipe = {
    imageUrl: string;
    title: string;
    id: string;
    description: string;
}

//TODO: all renders all recipes, owned renders only the recipies owned by the currently logged user
function RecipesWrapper({ wrapperType: string = 'all' }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState(RECIPES_PER_LOAD);

  useEffect(() => {
    // Initially load the first set of recipes
    loadMoreRecipes();
  }, []);

  const loadMoreRecipes = async () => {
    // Fetch next set of recipes (you'll need to implement this logic)
    // For example, fetch from an API endpoint
    // const newRecipes = await fetchRecipes(loaded, RECIPES_PER_LOAD);
    // setRecipes([...recipes, ...newRecipes]);
    // setLoaded(loaded + RECIPES_PER_LOAD);


    //TODO: think of a way to fetch only a range of recipies by index
  };

  // Placeholder function to simulate fetching recipes
  const fetchRecipes = async (start: number, count: number) => {
    // Implement fetching logic here
    // Return an array of recipes
  };

  //TODO: how will i be rendering the new recipies?
  //I don't want to rerender the entire list
  //I want only the newly fetched to appear at the bottom of the currently loaded ones
  return (
    <Box>
      {recipes.map(recipe => (
        <RecipeCard {...recipe}/>
      ))}
      <Button onClick={loadMoreRecipes} mt="4">
        Load More Recipes
      </Button>
    </Box>
  );
}

export default RecipesWrapper;
