import React from 'react';
import { useNavigate } from 'react-router-dom';

type RecipeCardProps = {
  image: string;
  title: string;
  id: string;
  description: string;
}

function RecipeCard({ id, image, title, description }: RecipeCardProps) {
  const navigate = useNavigate();

  function truncateDescription(text: string, maxLength: number) {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }
  

  const openRecipe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    //TODO: route to the details page of the recipe
    navigate(`/recipeDetails/${id}`);
  }

  return (
    <div className='recipe-item-container' onClick={openRecipe}>
      <div className='image-wrapper'>
        <img src={image} alt={`Image of ${title}`} />
      </div>
      <div className='details-wrapper'>
        <h2>{title}</h2>
        <p>{truncateDescription(description, 45)}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
