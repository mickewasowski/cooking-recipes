import { useEffect } from 'react';
import RecipeCard from './recipe/RecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/root-reducer';
import { getLatestAdded } from '../store/recipe/recipe.thunk';
import { RecipeRoutes } from '../utils/recipeUtils.types';
import { latestSelectors } from '../store/recipe/recipe.slice';


function HomePage() {
  const dispatcher = useDispatch();
  const allRecipies = useSelector((state: IRootState) => latestSelectors.selectAll(state));  

  useEffect(() => {
    dispatcher(getLatestAdded());
  }, []);

  return (
    <div className='home-wrapper'>
      <div className='inner-container'>
        <div className='hero-text-wrapper'>
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
          </div>
        </div>
      </div>
      <div className='recipes-container'>
        <h2>Checkout our latest entries</h2>
        <div className='recipes-wrapper'>
          {
            allRecipies &&
            allRecipies?.map(recipe => (
              <RecipeCard key={recipe?.id} {...recipe} routePrefix={RecipeRoutes.LatestAdded} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
