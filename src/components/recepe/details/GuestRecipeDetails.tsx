import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

function GuestRecipeDetails({ title, description, type, image, additionalData }) {
  return (
    <Box p={4}>
      <Image src={image} alt="Recipe Image" />
      <Text as="p">{title}</Text>
      <Text as="p">{type}</Text>
      <Text as="p">{description}</Text>
    </Box>
  );
}

export default GuestRecipeDetails;
