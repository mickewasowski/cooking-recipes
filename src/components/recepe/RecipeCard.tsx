import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

type RecipeCardProps = {
  imageUrl: string;
  title: string;
  id: string;
  description: string;
}

function RecipeCard({ id, imageUrl, title, description }: RecipeCardProps) {

  function truncateDescription(text: string, maxLength: number) {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }
  

  const openRecipe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: route to the details page of the recipe
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" key={id}>
      <Image src={imageUrl} alt={`Image of ${title}`} />

      <Box p="6">
        <Stack spacing="4">
          <Heading fontSize="xl">{title}</Heading>
          <Text fontSize="md">{truncateDescription(description, 30)}</Text>
          <Button colorScheme="blue" onClick={openRecipe}>Details</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default RecipeCard;
