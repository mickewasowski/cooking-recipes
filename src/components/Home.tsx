import { useEffect } from 'react';
import SearchBar from './misc/SearchBar'; // Import your SearchBar component
import RecipeCard from './recepe/RecipeCard'; // Import your RecipeCard component
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/root-reducer';
import { getLatestRecipes } from '../store/recipe/recipe.selector';
import { getLatestRecipiesStart } from '../store/recipe/recipe.action';


function HomePage() {
  const dispatcher = useDispatch();
  //TODO: take the latest 3 added
  const allRecipies = useSelector((state: IRootState) => getLatestRecipes(state.recipe));

  useEffect(() => {
    dispatcher(getLatestRecipiesStart());
  }, []);

  return (
    <div className='home-wrapper'>
      <div>
        <h1 className='main-heading'>Unlock you appetite</h1>
        <div className='text-carousel'>
          <div className='animation-container'>
            <div>
              <p>Salads</p>
            </div>
            <div>
              <p>Soups</p>
            </div>
            <div>
              <p>Desserts</p>
            </div>
            <div>
              <p>Vegan</p>
            </div>
          </div>
        </div>
        <div className='recipes-container'>
          <h2>Checkout our user's latest entries</h2>
          <div className='recipes-wrapper'>
            {
              allRecipies?.map(recipe => (
                <RecipeCard key={recipe?.id} {...recipe} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
