import React from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import SearchBar from './misc/SearchBar'; // Import your SearchBar component
import RecipeCard from './recepe/RecipeCard'; // Import your RecipeCard component
import RecipeWrapper from './recepe/RecipeWrapper';

// Sample data for popular recipes
const popularRecipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'A classic Italian pasta dish with creamy egg sauce and pancetta.'
  },
  // Add more recipes...
];

function HomePage() {
  return (
    <Box>
      <Box p="4">
        <Heading as="h1" size="xl" mb="6">Welcome to MyRecipes!</Heading>
        <SearchBar />
        <Heading as="h2" size="lg" mt="10" mb="6">Popular Recipes</Heading>
        <RecipeWrapper wrapperType='latest' />
      </Box>
    </Box>
  );
}

export default HomePage;
