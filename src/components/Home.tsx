import { useEffect } from 'react';
import SearchBar from './misc/SearchBar'; // Import your SearchBar component
import RecipeCard from './recepe/RecipeCard'; // Import your RecipeCard component
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/root-reducer';
import { getLatestRecipes } from '../store/recipe/recipe.selector';
import { getLatestRecipiesStart } from '../store/recipe/recipe.action';


function HomePage() {
  const dispatcher = useDispatch();
  const allRecipies = useSelector((state: IRootState) => getLatestRecipes(state.recipe));

  useEffect(() => {
    dispatcher(getLatestRecipiesStart());
  }, []);

  return (
    <div>
      <div>
        <h2>Welcome to MyRecipes!</h2>
        <SearchBar />
        <h2>Popular Recipes</h2>
        <div>
          {
            allRecipies?.map(recipe => (
              <RecipeCard key={recipe?.id} {...recipe} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
