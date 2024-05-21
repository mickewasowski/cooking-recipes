import React, { useState } from 'react';

function RecipeDetails() {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ ...currentRecipe });

  const handleToggle = () => setIsEditable(!isEditable);

  const handleInputChange = (e) => {
    setEditedRecipe({ ...editedRecipe, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    // Implement save logic
  };

  const cancelChanges = () => {
    setEditedRecipe({ ...recipe });
    setIsEditable(false);
  };

  return (
    null
    // <Box p="4">
    //     <Image src={currentRecipe.imageUrl} alt={`Image of ${currentRecipe.title}`} />
    //   {isOwner && (
    //     <FormControl display="flex" alignItems="center" mb="4">
    //       <FormLabel htmlFor="edit-toggle" mb="0" mr="2">Edit Mode</FormLabel>
    //       <Switch id="edit-toggle" isChecked={isEditable} onChange={handleToggle} />
    //     </FormControl>
    //   )}

    //   <FormControl isDisabled={!isEditable || !isOwner}>
    //     <FormLabel>Title</FormLabel>
    //     <Input name="title" value={editedRecipe.title} onChange={handleInputChange} isReadOnly={!isOwner} />
    //   </FormControl>

    //   <FormControl isDisabled={!isEditable || !isOwner} mt="4">
    //     <FormLabel>Description</FormLabel>
    //     <Input name="description" value={editedRecipe.description} onChange={handleInputChange} isReadOnly={!isOwner} />
    //   </FormControl>

    //   <FormControl isDisabled={!isEditable || !isOwner} mt="4">
    //     <FormLabel>ImageUrl</FormLabel>
    //     <Input name="imageUrl" value={editedRecipe.imageUrl} onChange={handleInputChange} isReadOnly={!isOwner} />
    //   </FormControl>

    //   {isEditable && isOwner && (
    //     <Box mt="4">
    //       <Button colorScheme="blue" mr="2" onClick={saveChanges}>Save Changes</Button>
    //       <Button colorScheme="red" onClick={cancelChanges}>Cancel</Button>
    //     </Box>
    //   )}

    //   {!isOwner && (
    //     <Box mt="4">
    //       <Text fontSize="xl"><b>Title:</b> {currentRecipe.title}</Text>
    //       <Text fontSize="md"><b>Description:</b> {currentRecipe.description}</Text>
    //     </Box>
    //   )}
    // </Box>
  );
}

export default RecipeDetails;
