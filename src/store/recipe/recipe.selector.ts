import { RecipesToLoad } from "../../utils/recipeUtils.types";
import { IRootState } from "../root-reducer";
import { RecipeState, ownedSelectors, recipeSelectors } from "./recipe.slice";

export const getRecipies = (state: IRootState) => recipeSelectors.selectAll(state);
export const getRecipeCount = (state: RecipeState) => state.totalRecipeCount;
export const getRecipeById = (state: RecipeState, id: string) => getRecipeObjectById(state, id);
export const getLatestRecipes = (state: RecipeState) => state.latestAdded.entities;
export const getOwnedRecipesCount = (state: RecipeState) => state.ownedRecipesCount;
export const getOwnedRecipes = (state: IRootState) => ownedSelectors.selectAll(state);
export const getStoredSearchString = (state: RecipeState) => state.searchString;

export const getRecipesByType = (state: IRootState, type: string) => {
    switch (type) {
        case RecipesToLoad.All: {
            return getRecipies(state);
        }
        case RecipesToLoad.Owned: {
            return getOwnedRecipes(state);
        }
    }
}

export const getRecipesCountByType = (state: RecipeState, type: string) => {
    switch (type) {
        case RecipesToLoad.All: {
            return getRecipeCount(state);
        }
        case RecipesToLoad.Owned: {
            return getOwnedRecipesCount(state);
        }
        default:
            return 0;
    }
}

const getRecipeObjectById = (state: RecipeState, id: string) => {
    let recipe = state.recipies?.entities[id];
    if (!recipe) {
        recipe = state.ownedRecipes?.entities[id];
    }
    if (!recipe) {
        recipe = state.latestAdded?.entities[id];
    }
    return recipe;
}
