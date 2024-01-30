import React, { useState } from 'react';
import { Box, Input, Textarea, Image, Button, Switch, FormControl, FormLabel } from '@chakra-ui/react';

function OwnerRecipeDetails({ title, description, type, image }) {
  const [isEditable, setIsEditable] = useState(false);
  const [recipe, setRecipe] = useState({});

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Logic to handle cancel (like reverting to initial state)
    setIsEditable(false);
  };

  return (
    <Box p={4}>
        {image && <Image src={image} alt="Recipe Image" />}
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="edit-toggle" mb="0">
          Edit Mode
        </FormLabel>
        <Switch id="edit-toggle" onChange={handleEditToggle} />
      </FormControl>
      <Input
        placeholder="Title"
        value={title}
        isReadOnly={!isEditable}
        name="title"
        onChange={handleChange}
      />
      <Textarea
        placeholder="Description"
        value={description}
        isReadOnly={!isEditable}
        name="description"
        onChange={handleChange}
      />
      <Input
        placeholder="Image URL"
        value={image}
        isReadOnly={!isEditable}
        name="imageURL"
        onChange={handleChange}
      />
      {isEditable && (
        <Box>
          <Button colorScheme="blue" mr={3}>
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
