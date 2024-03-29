import { RECIPE_ACTION_TYPES, TotalRecipesCount, RecipeCreated, GetRecipes, RecipeAddStart, RecipeUpdate, SearchRecipesSuccess, RecipesForOwner } from "./recipe.types";

export const addRecipeStart = (recipeData: RecipeAddStart) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_START, payload: recipeData});
export const addRecipeSuccess = (recipeData: RecipeCreated) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS, payload: recipeData });
export const addRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED, payload: error });

export const getRecipiesStart = (data: GetRecipes) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_START, payload: data });
export const getRecipiesSuccess = (recipies: RecipeCreated[]) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_SUCCESS, payload: recipies });
export const getRecipiesFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_FAILED, payload: error });

export const getRecipeCountStart = () => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START });
export const getRecipeCountSuccess = ({ totalRecipeCount }: TotalRecipesCount) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_SUCCESS, payload: { totalRecipeCount } });
export const getRecipeCountFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_FAILED, payload: error });

export const updateRecipeStart = (recipeData: RecipeUpdate) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, payload: recipeData });
export const updateRecipeSuccess = (recipeData: RecipeCreated) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_SUCCESS, payload: recipeData });
export const updateRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_FAILED, payload: error });

export const searchRecipiesStart = (searchString: string) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START, payload: searchString });
export const searchRecipiesSuccess = (data: SearchRecipesSuccess) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_SUCCESS, payload: data });
export const searchRecipiesFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_FAILED, payload: error });

export const getRecipiesForOwnerStart = (ownerData: RecipesForOwner) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START, payload: ownerData });
export const getRecipiesForOwnerSuccess = (data: SearchRecipesSuccess) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_SUCCESS, payload: data });
export const getRecipiesForOwnerFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_FAILED, payload: error });
