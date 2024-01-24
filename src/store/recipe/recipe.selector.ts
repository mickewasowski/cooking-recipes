import { RecipeState } from "./recipe.reducer";

export const getRecipies = (state: RecipeState) => state.recipies;
export const getRecipeCount = (state: RecipeState) => state.recipeCount;