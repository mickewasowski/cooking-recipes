import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { getRecipeCount, getRecipies } from '../../store/recipe/recipe.selector';
import { getRecipeCountStart, getRecipiesStart } from '../../store/recipe/recipe.action';
import SearchBar from '../misc/SearchBar';

const AllRecipes = () => {
  const recipesPerPage = 10; // We will display 10 recipes per page
  
  const dispatcher = useDispatch();
  const recipeCount = useSelector((state: IRootState) => getRecipeCount(state.recipe));
  const allRecipies = useSelector((state: IRootState) => getRecipies(state.recipe));

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
      dispatcher(getRecipeCountStart());
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(recipeCount/recipesPerPage);
    setTotalPages(totalPages);
  }, [recipeCount]);

  useEffect(() => {
    if (totalPages) {
      dispatcher(getRecipiesStart({ page: currentPage, limit: recipesPerPage }));
    }
  }, [totalPages]);

  useEffect(() => {
    dispatcher(getRecipiesStart({ page: currentPage, limit: recipesPerPage }));
  }, [currentPage]);

  const handlePreviousClick = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  return (
    null
    // <Box>
    //     <Flex wrap="wrap" justify="center" gap="20px">
    //         {allRecipies?.map(recipe => (
    //             <RecipeCard key={recipe?.id} {...recipe} />
    //         ))}
    //     </Flex>
    //     <Flex justify="center" align="center" mt="20px">
    //         <Button onClick={handlePreviousClick} disabled={currentPage === 1}>
    //             Previous
    //         </Button>
    //         <Text mx="15px">Page {currentPage} of {totalPages}</Text>
    //         <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
    //             Next
    //         </Button>
    //     </Flex>
    // </Box>
  );
};

export default AllRecipes;
