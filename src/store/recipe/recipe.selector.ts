import { RecipeState } from "./recipe.reducer";

export const getRecipies = (state: RecipeState) => state.recipies;
export const getRecipeCount = (state: RecipeState) => state.totalRecipeCount;
export const getRecipeById = (state: RecipeState, id: string) => getRecipeObjectById(state, id);


const getRecipeObjectById = (state: RecipeState, id: string) => {
    const recipe = state.recipies.find(x => x.id === id);
    return recipe;
}