import { AdditionalData } from "./recipe.slice";

export enum RECIPE_ACTION_TYPES {
    ADD_RECIPE = 'recipe/addRecipe',
    GET_RECIPIES = 'recipe/getRecipes',
    GET_RECIPES_COUNT = 'recipe/getRecipeCount',
    UPDATE_RECIPE = 'recipe/updateRecipe',
    SEARCH_RECIPIES = 'recipe/searchRecipes',
    GET_OWNER_RECIPIES = 'recipe/getOwnerRecipes',
    GET_LATEST_ADDED_RECIPES = 'recipe/getLatestAdded',
    GET_OWNED_RECIPE_COUNT= 'recipe/getOwnerRecipesCount',
}

export type TotalRecipesCount = {
    totalRecipeCount: number;
}

export type OwnedRecipesCount = {
    ownedRecipesCount: number;
}

export type Recipe = {
    title: string;
    image: string;
    type: string;
    description: string;
    additionalData: AdditionalData;
}

export type RecipeAdd = Recipe & {
    userToken: string;
}

export type RecipeUpdate = RecipeAdd & {
    id: string;
}

export type RecipeCreated = Recipe & {
    id: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

export type GetRecipes = {
    page: number;
    limit: number;
}

export type SearchRecipesSuccess = {
    recipies: RecipeCreated[];
    count: number;
}

export type RecipesForOwner = {
    ownerId: string;
    page: number;
    limit: number;
}
