import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { getRecipesCountByType, getRecipesByType } from '../../store/recipe/recipe.selector';
import SearchBar from '../misc/SearchBar';
import { RecipeRoutes, RecipesToLoad } from '../../utils/recipeUtils.types';
import { getCurrentUser } from '../../store/user/user.selector';
import { getOwnerRecipes, getOwnerRecipesCount, getRecipeCount, getRecipesPerPageWithLimit } from '../../store/recipe/recipe.thunk';

interface IProps {
  recipesToLoad: RecipesToLoad;
}

const RecipesWrapper = ({ recipesToLoad }: IProps) => {
  const recipesPerPage = 10; // We will display 10 recipes per page
  const dispatcher = useDispatch();
  const recipeCount = useSelector((state: IRootState) => getRecipesCountByType(state.recipe, recipesToLoad));
  const allRecipies = useSelector((state: IRootState) => getRecipesByType(state.recipe, recipesToLoad));
  const user = useSelector((state: IRootState) => getCurrentUser(state.user));

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (recipesToLoad === RecipesToLoad.All) {
      dispatcher(getRecipeCount());
    } else if (recipesToLoad === RecipesToLoad.Owned) {
      if (user) {
        dispatcher(getOwnerRecipesCount(user.id));
      }
    }

    return () => {
      setCurrentPage(1);
      setTotalPages(0);
    }
  }, [recipesToLoad]);

  useEffect(() => {
    const totalPages = Math.ceil(recipeCount/recipesPerPage);
    setTotalPages(totalPages);
  }, [recipeCount]);

  useEffect(() => {
    if (totalPages) {
      if (recipesToLoad === RecipesToLoad.All) {
        dispatcher(getRecipesPerPageWithLimit({ page: currentPage, limit: recipesPerPage }));
      } else if (recipesToLoad === RecipesToLoad.Owned) {
        if (user) {
          dispatcher(getOwnerRecipes({ page: currentPage, limit: recipesPerPage, ownerId: user.id }));
        }
      }
    }
  }, [totalPages]);

  useEffect(() => {
    if (recipesToLoad === RecipesToLoad.All) {
      dispatcher(getRecipesPerPageWithLimit({ page: currentPage, limit: recipesPerPage }));
    } else if (recipesToLoad === RecipesToLoad.Owned) {
      if (user) {
        dispatcher(getOwnerRecipes({ page: currentPage, limit: recipesPerPage, ownerId: user.id }));
      }
    }
  }, [currentPage]);

  const handlePreviousClick = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const recipeRoute = recipesToLoad === RecipesToLoad.All ? RecipeRoutes.AllRecipes : RecipeRoutes.OwnedRecipes;

  return (
    <div className='loaded-recipes-container'>
      {
        !allRecipies?.length
        ? <p>No recipes found!</p>
        : (
          <>
            <SearchBar currentPage={currentPage} recipeLimit={recipesPerPage} recipesOwnership={recipesToLoad} />
            <div className='recipes-container'>
                {allRecipies?.map(recipe => (
                    <RecipeCard key={recipe?.id} {...recipe} routePrefix={recipeRoute} />
                ))}
            </div>
            <div className='buttons-container'>
                <button onClick={handlePreviousClick} disabled={currentPage === 1}>
                    Previous
                </button>
                <p>Page {currentPage} of {totalPages}</p>
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default RecipesWrapper;
