import React, { useState } from 'react';
import { Box, Input, Textarea, Image, Button, Switch, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateRecipeStart } from '../../../store/recipe/recipe.action';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/root-reducer';
import { getCurrentUser } from '../../../store/user/user.selector';

function OwnerRecipeDetails({ id, title, description, type, image, additionalData }) {
  const user = useSelector((state: IRootState) => getCurrentUser(state.user));
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [recipe, setRecipe] = useState({
    title,
    description,
    imageURL: image,
    timeToPrepare: additionalData?.timeToPrep ?? '',
    numberOfPortions: additionalData?.numberOfPortions ?? '',
    ingredients: additionalData?.ingredients ? [...additionalData.ingredients] : [''],
    howToPrepare: additionalData?.howToPrepare ?? ''
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    if (e.target.name.startsWith('ingredient-')) {
      const index = parseInt(e.target.name.split('-')[1], 10);
      const newIngredients = [...recipe.ingredients];
      newIngredients[index] = e.target.value;
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }
  };

  const addIngredientField = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const handleCancel = () => {
    // Logic to revert to the initial state
    setIsEditable(false);
  };

  const handleUpdateRecipe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedRecipeData = {
      _id: id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.imageURL,
      type,
      additionalData: {
        timeToPrep: recipe.timeToPrepare,
        ingredients: recipe.ingredients,
        howToPrepare: recipe.howToPrepare,
        numberOfPortions: recipe.numberOfPortions
      },
      userToken: user?.token,
    };

    dispatch(updateRecipeStart({ ...updatedRecipeData }));
  }

  return (
    <Box p={2} display='flex' flexDirection='column' width='90%' alignItems='center' justifyItems='center'>
      <Box display='flex' flexDirection='row' gap='5' alignItems='center' justifyContent='center' width='100%'>
        <Box width='40%'>
          {image && <Image src={image} alt="Recipe Image" />}
        </Box>
        <Box width='60%'>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="edit-toggle" mb="0">
              Edit Mode
            </FormLabel>
            <Switch id="edit-toggle" onChange={handleEditToggle} />
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={recipe.title}
              isDisabled={!isEditable}
              name="title"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={recipe.description}
              isDisabled={!isEditable}
              name="description"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Image URL</FormLabel>
            <Input
              placeholder="Image URL"
              value={recipe.imageURL}
              isDisabled={!isEditable}
              name="imageURL"
              onChange={handleChange}
            />
          </FormControl>
          
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Time to Prepare (minutes)</FormLabel>
            <Input
              placeholder="Time to Prepare (minutes)"
              type="number"
              value={recipe.timeToPrepare}
              isDisabled={!isEditable}
              name="timeToPrepare"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Number of Portions</FormLabel>
            <Input
              placeholder="Number of Portions"
              type="number"
              value={recipe.numberOfPortions}
              isDisabled={!isEditable}
              name="numberOfPortions"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>Ingredients</FormLabel>
            {recipe.ingredients.map((ingredient, index) => (
              <Box key={index} display="flex" flexDirection='column' alignItems="center" marginY={2}>
                <Input
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  isDisabled={!isEditable}
                  name={`ingredient-${index}`}
                  onChange={handleChange}
                />
                {isEditable && index === recipe.ingredients.length - 1 && (
                  <IconButton
                    aria-label="Add ingredient"
                    icon={<AddIcon />}
                    onClick={addIngredientField}
                    ml={2}
                    marginY={2}
                  />
                )}
              </Box>
            ))}
          </FormControl>
          <FormControl isDisabled={!isEditable} mt="4">
            <FormLabel>How to Prepare</FormLabel>
            <Textarea name="howToPrepare" value={recipe.howToPrepare} onChange={handleChange} />
          </FormControl>
        </Box>
      </Box>

      {isEditable && (
        <Box display='flex' alignContent='center' justifyContent='center' marginTop={3} marginBottom={2}>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateRecipe}>
            Save
          </Button>
          <Button colorScheme="red" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default OwnerRecipeDetails;
