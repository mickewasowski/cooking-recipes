import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';


const CookingDetailsSection = () => {

  return (
    <Flex align="center" justify="space-around" p={4} background="#bfdaa41a" borderRadius="md" marginTop={5}>
      {/* Favorites */}
      <Box textAlign="center">
        <Icon as={FaHeart} boxSize={6} />
        <Text mt={2}>Likes</Text>
      </Box>

      {/* Cooking Time */}
      <Flex direction="column" align="center">
        <Icon as={FaClock} boxSize={6} />
        <Text mt={2}>Cooking time 25min</Text>
      </Flex>

      {/* Portions */}
      <Flex direction="column" align="center">
        <Icon as={FaUtensils} boxSize={6} />
        <Text mt={2}>Portions 10</Text>
      </Flex>
    </Flex>
  );
};

export default CookingDetailsSection;
