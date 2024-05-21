import { useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { addRecipeStart } from '../../store/recipe/recipe.action';
import { getCurrentUser } from '../../store/user/user.selector';

function AddRecipeForm() {
    const dispatch = useDispatch();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));

    const [formData, setFormData] = useState({
        title: '',
        type: 'salad', // default to the first option
        description: '',
        imageUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addRecipeStart({ title: formData.title, image: formData.imageUrl, description: formData.description, type: formData.type, userToken: user.token }));
    };

    return (
        null
        // <Box p={4} maxW="md" mx="auto">
        // {formData.imageUrl && (
        //     <Image src={formData.imageUrl} alt="Recipe image" mb={4} />
        // )}
        // <form onSubmit={handleSubmit}>
        //     <VStack spacing={4}>
        //     <FormControl isRequired>
        //         <FormLabel>Title</FormLabel>
        //         <Input
        //         name="title"
        //         value={formData.title}
        //         onChange={handleInputChange}
        //         />
        //     </FormControl>

        //     <FormControl isRequired>
        //         <FormLabel>Type</FormLabel>
        //         <Select
        //         name="type"
        //         value={formData.type}
        //         onChange={handleInputChange}
        //         >
        //         <option value="salad">Salad</option>
        //         <option value="pasta">Pasta</option>
        //         <option value="soup">Soup</option>
        //         <option value="stir fry">Stir Fry</option>
        //         <option value="desert">Desert</option>
        //         </Select>
        //     </FormControl>

        //     <FormControl isRequired>
        //         <FormLabel>Description</FormLabel>
        //         <Textarea
        //         name="description"
        //         value={formData.description}
        //         onChange={handleInputChange}
        //         />
        //     </FormControl>

        //     <FormControl isRequired>
        //         <FormLabel>Image URL</FormLabel>
        //         <Input
        //         name="imageUrl"
        //         value={formData.imageUrl}
        //         onChange={handleInputChange}
        //         />
        //     </FormControl>

        //     <Button type="submit" colorScheme="blue">
        //         Add Recipe
        //     </Button>
        //     </VStack>
        // </form>
        // </Box>
    );
}

const EnhancedComponent = isAuth(AddRecipeForm);

export default EnhancedComponent;
