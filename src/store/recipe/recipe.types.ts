export enum RECIPE_ACTION_TYPES {
    ADD_RECIPE_START = 'recipe/ADD_RECIPE_START',
    ADD_RECIPE_SUCCESS = 'recipe/ADD_RECIPE_SUCCESS',
    ADD_RECIPE_FAILED = 'recipe/ADD_RECIPE_FAILED',
    GET_RECIPIES_START = 'recipe/GET_RECIPIES_START',
    GET_RECIPIES_SUCCESS = 'recipe/GET_RECIPIES_SUCCESS',
    GET_RECIPIES_FAILED = 'recipe/GET_RECIPIES_FAILED',
    GET_RECIPE_COUNT_START = 'recipe/GET_RECIPE_COUNT_START',
    GET_RECIPE_COUNT_SUCCESS = 'recipe/GET_RECIPE_COUNT_SUCCESS',
    GET_RECIPE_COUNT_FAILED = 'recipe/GET_RECIPE_COUNT_FAILED',
    UPDATE_RECIPE_START = 'recipe/UPDATE_RECIPE_START',
    UPDATE_RECIPE_SUCCESS = 'recipe/UPDATE_RECIPE_SUCCESS',
    UPDATE_RECIPE_FAILED = 'recipe/UPDATE_RECIPE_FAILED',
    SEARCH_RECIPIES_START = 'recipe/SEARCH_RECIPIES_START',
    SEARCH_RECIPIES_SUCCESS = 'recipe/SEARCH_RECIPIES_SUCCESS',
    SEARCH_RECIPIES_FAILED = 'recipe/SEARCH_RECIPIES_FAILED',
    GET_OWNER_RECIPIES_START = 'recipe/GET_OWNER_RECIPIES_START',
    GET_OWNER_RECIPIES_SUCCESS = 'recipe/GET_OWNER_RECIPIES_SUCCESS',
    GET_OWNER_RECIPIES_FAILED = 'recipe/GET_OWNER_RECIPIES_FAILED',
    GET_LATEST_ADDED_RECIPES_START = 'recipe/GET_LATEST_ADDED_RECIPES_START',
    GET_LATEST_ADDED_RECIPES_SUCCESS = 'recipe/GET_LATEST_ADDED_RECIPES_SUCCESS',
    GET_LATEST_ADDED_RECIPES_FAILED = 'recipe/GET_LATEST_ADDED_RECIPES_FAILED',
}

export type TotalRecipesCount = {
    totalRecipeCount: number;
}

export type Recipe = {
    title: string;
    image: string;
    type: string;
    description: string;
    additionalData?: Map<string, any>;
}

export type RecipeAddStart = Recipe & {
    userToken: string;
}

export type RecipeUpdate = RecipeAddStart & {
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
    userToken: string;
}
