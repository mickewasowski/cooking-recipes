import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRecipeRequest, getLatestRecipes, getRecipeCountFromDatabase, getRecipesCountPerOwner, getRecipiesFromDatabase, getRecipiesPerOwner, searchRecipiesByQueryString, updateRecipeData } from "../../utils/recipeUtils";
import { GetRecipes, RECIPE_ACTION_TYPES, RecipeAdd, RecipeUpdate, RecipesForOwner } from "./recipe.types";

export const addRecipe = createAsyncThunk(RECIPE_ACTION_TYPES.ADD_RECIPE, async (data: RecipeAdd) => {
    const res = await addRecipeRequest(data);
    return res;
});

export const getRecipesPerPageWithLimit = createAsyncThunk(RECIPE_ACTION_TYPES.GET_RECIPIES, async (data: GetRecipes) => {
    const res = await getRecipiesFromDatabase(data);
    return res;
});

export const getRecipeCount = createAsyncThunk(RECIPE_ACTION_TYPES.GET_RECIPES_COUNT, async () => {
    const res = await getRecipeCountFromDatabase();
    return res;
});

export const updateRecipe = createAsyncThunk(RECIPE_ACTION_TYPES.UPDATE_RECIPE, async (data: RecipeUpdate) => {
    const res = await updateRecipeData(data);
    return res;
});

export const searchRecipes = createAsyncThunk(RECIPE_ACTION_TYPES.SEARCH_RECIPIES, async (data: string) => {
    const res = await searchRecipiesByQueryString(data);
    return res;
});

export const getOwnerRecipes = createAsyncThunk(RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES, async (data: RecipesForOwner) => {
    const res = await getRecipiesPerOwner(data);
    return res;
});

export const getOwnerRecipesCount = createAsyncThunk(RECIPE_ACTION_TYPES.GET_OWNED_RECIPE_COUNT, async (data: string) => {
    const res = await getRecipesCountPerOwner(data);
    return res;
});

export const getLatestAdded = createAsyncThunk(RECIPE_ACTION_TYPES.GET_LATEST_ADDED_RECIPES, async () => {
    const res = await getLatestRecipes();
    return res;
});
