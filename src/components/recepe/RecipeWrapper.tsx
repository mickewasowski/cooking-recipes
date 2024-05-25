import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { getRecipesCountByType, getRecipesByType } from '../../store/recipe/recipe.selector';
import {
  getRecipeCountStart,
  getRecipiesStart,
  getOwnedRecipeCountStart,
  getRecipiesForOwnerStart,
} from '../../store/recipe/recipe.action';
import SearchBar from '../misc/SearchBar';
import { RecipesToLoad } from '../../utils/recipeUtils.types';
import { getCurrentUser } from '../../store/user/user.selector';

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
      dispatcher(getRecipeCountStart());
    } else if (recipesToLoad === RecipesToLoad.Owned) {
      if (user) {
        dispatcher(getOwnedRecipeCountStart(user.id));
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
        dispatcher(getRecipiesStart({ page: currentPage, limit: recipesPerPage }));
      } else if (recipesToLoad === RecipesToLoad.Owned) {
        if (user) {
          dispatcher(getRecipiesForOwnerStart({ page: currentPage, limit: recipesPerPage, ownerId: user.id }));
        }
      }
    }
  }, [totalPages]);

  useEffect(() => {
    if (recipesToLoad === RecipesToLoad.All) {
      dispatcher(getRecipiesStart({ page: currentPage, limit: recipesPerPage }));
    } else if (recipesToLoad === RecipesToLoad.Owned) {
      if (user) {
        dispatcher(getRecipiesForOwnerStart({ page: currentPage, limit: recipesPerPage, ownerId: user.id }));
      }
    }
  }, [currentPage]);

  const handlePreviousClick = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  return (
    <div className='loaded-recipes-container'>
      {
        !allRecipies?.length
        ? <p>No recipes found!</p>
        : (
          <>
            <SearchBar />
            <div className='recipes-container'>
                {allRecipies?.map(recipe => (
                    <RecipeCard key={recipe?.id} {...recipe} />
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
