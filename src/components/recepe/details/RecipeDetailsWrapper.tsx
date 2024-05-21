import OwnerRecipeDetails from "./OwnerRecipeDetails";
import GuestRecipeDetails from "./GuestRecipeDetails";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/user/user.selector";
import { getRecipeById } from "../../../store/recipe/recipe.selector";
import { IRootState } from "../../../store/root-reducer";
import { useParams } from "react-router-dom";

function RecipeDetailsWrapper() {
    const { recipeId } = useParams();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const recipe = useSelector((state: IRootState) => getRecipeById(state.recipe, recipeId));

    if (!recipe) return null;

    return(
        <div
            // display='flex'
            // alignContent='center'
            // justifyContent='center'
            // flexDirection='column'
            // paddingLeft={20}
            // paddingRight={20}

        >
            {
                user?.id !== undefined && user?.id === recipe?.owner
                ? <OwnerRecipeDetails recipe={recipe} />
                : <GuestRecipeDetails recipe={recipe} />
            }
        </div>
    )
}

export default RecipeDetailsWrapper;
