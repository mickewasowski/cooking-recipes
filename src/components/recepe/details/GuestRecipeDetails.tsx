import React from 'react';
import { Box, Text, Image, Center } from '@chakra-ui/react';
import CookingDetailsSection from './CookingDetailsSection';
import { IProps } from './OwnerRecipeDetails';

function GuestRecipeDetails({ recipe }: IProps) {
  const { title, description, type, imageUrl, additionalData } = recipe;
  return (
    <Box p={4}>
      <Text as="p" fontSize='50'>{title}</Text>
      <Image src={imageUrl} alt="Recipe Image" margin='auto' maxH='400px' borderRadius='3px' />
      <CookingDetailsSection />
      <Text as="p">{description}</Text>
    </Box>
  );
}

export default GuestRecipeDetails;
