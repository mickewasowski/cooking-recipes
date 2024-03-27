import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type RecipeCardProps = {
  image: string;
  title: string;
  id: string;
  description: string;
}

function RecipeCard({ id, image, title, description }: RecipeCardProps) {
  const navigate = useNavigate();

  function truncateDescription(text: string, maxLength: number) {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }
  

  const openRecipe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: route to the details page of the recipe
    navigate(`/recipeDetails/${id}`);
  }

  return (
    <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        w='350px'
        h='350px'
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        borderColor='#D5E7B8'
        bg='#bfdaa41a'
        p="1"
        key={id}
      >
      <Image boxSize='200px' objectFit='cover' src={image} alt={`Image of ${title}`} />
      <Box p="3">
        <Stack spacing="2">
          <Heading fontSize="xl">{title}</Heading>
          <Text fontSize="md">{truncateDescription(description, 30)}</Text>
          <Button color='#384031' bgColor='#D5E7B8' _hover={{ bg: "#505C45", color: '#D4F3B7' }} onClick={openRecipe}>Details</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default RecipeCard;
