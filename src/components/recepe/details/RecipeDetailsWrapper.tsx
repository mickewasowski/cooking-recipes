import OwnerRecipeDetails from "./OwnerRecipeDetails";
import GuestRecipeDetails from "./GuestRecipeDetails";
import { Box } from "@chakra-ui/react";
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
        <Box
            display='flex'
            alignContent='center'
            justifyContent='center'
        >
            {
                user?.id !== undefined && user?.id === recipe?.owner
                ? <OwnerRecipeDetails title={recipe.title} description={recipe.description} type={recipe.type} image={recipe.imageUrl} />
                : <GuestRecipeDetails title={recipe.title} description={recipe.description} type={recipe.type} image={recipe.imageUrl} />
            }
        </Box>
    )
}

export default RecipeDetailsWrapper;
