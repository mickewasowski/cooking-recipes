import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/user/user.selector";
import { getRecipeById } from "../../store/recipe/recipe.selector";
import { IRootState } from "../../store/root-reducer";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import EditRecipeModal from "./EditRecipeModal";

function RecipeDetailsWrapper() {
    const editRecipeModalRef = useRef<HTMLDialogElement>(null);
    const { recipeId } = useParams();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const recipe = recipeId && useSelector((state: IRootState) => getRecipeById(state.recipe, recipeId));
    if (!recipe) return null;
    const {
        title,
        description,
        image: imageURL,
        owner: ownerId,
        additionalData,
    } = recipe;

    const servings = additionalData && additionalData.servings;
    const prepTime = additionalData && additionalData.prepTime;
    const cookingTime = additionalData && additionalData.cookingTime;
    const ingredientsArray = additionalData && additionalData.ingredients;
    const isOwned = ownerId === user?.id;

    const showEditModal = () => {
        if (editRecipeModalRef?.current) {
            editRecipeModalRef.current.showModal();
        }
    }

    return(
        <>
            <div className="recipe-details-wrapper">
            { isOwned && <button className="edit-recipe-btn" onClick={showEditModal}>Edit</button> }
            <header>
                    <div className="recipe-img-container">
                        <img src={imageURL} alt={title} loading="lazy" />
                    </div>
                    <div className="recipe-title-container">
                        <h2>{title}</h2>
                    </div>
            </header>
            <main>
                    <div className="prep-details">
                        { servings && <p>servings: {servings}</p> }
                        { prepTime && <p>prepping time: {prepTime}</p> }
                        { cookingTime && <p>cooking time: {cookingTime}</p> }
                    </div>
                    <div className="prep-description">
                        <div className="ingredients">
                            <h3>ingredients</h3>
                            {
                                ingredientsArray?.map((ingred: string, index: number) => {
                                    return (
                                        <p key={index}>{ingred}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="instructions">
                            <h3>directions</h3>
                            <p>{description}</p>
                        </div>
                    </div>
            </main>
            </div>
            { user && user.id === ownerId ? (
                <EditRecipeModal refElement={editRecipeModalRef} recipeData={recipe}/>
            ) : null }
        </>
    )
}

export default RecipeDetailsWrapper;
