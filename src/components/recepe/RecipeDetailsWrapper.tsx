import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/user/user.selector";
import { getRecipeById } from "../../store/recipe/recipe.selector";
import { IRootState } from "../../store/root-reducer";
import { useParams } from "react-router-dom";

function RecipeDetailsWrapper() {
    const { recipeId } = useParams();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const recipe = recipeId && useSelector((state: IRootState) => getRecipeById(state.recipe, recipeId));
    if (!recipe) return null;
    const {
        title,
        description,
        type,
        image: imageURL,
        owner: ownerId,
        additionalData,
    } = recipe;

    //TODO: check if additionalData has the following:
    // servings, prepTime, cookingTime  => these should go in the prep-details
    const servings = true //additionalData && additionalData.get('servings');
    const prepTime = true //additionalData && additionalData.get('prepTime');
    const cookingTime = true //additionalData && additionalData.get('cookingTime');
    // ingredients => should go in prep => make sure its array of strings
    const ingredientsArray = additionalData && additionalData.get('ingredients');
    const isOwned = ownerId === user?.id;

    //TODO: attach the click event to the button
    //it should create a dialog to edit the recipe

    return(
        <div className="recipe-details-wrapper">
           { isOwned && <button className="edit-recipe-btn">Edit</button> }
           <header>
                <div className="recipe-img-container">
                    <img src={imageURL} alt={title}/>
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
                            ingredientsArray?.map((ingred, index) => {
                                return (
                                    <p key={index}>{ingred}</p>
                                )
                            })
                        }
                        <p>100 ml milk</p>
                        <p>50 g butter</p>
                        <p>3 eggs</p>
                        <p>1 tbs cocoa</p>
                        <p>2 tsp baking soda</p>
                    </div>
                    <div className="instructions">
                        <h3>directions</h3>
                        {/* <p>{description}</p> */}
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
           </main>
        </div>
    )
}

export default RecipeDetailsWrapper;
