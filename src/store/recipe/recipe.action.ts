import { RECIPE_ACTION_TYPES } from "./recipe.types";

export const addRecipeStart = ({ title, image, type, description, userToken }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_START, payload: { title, image, type, description, userToken }});
export const addRecipeSuccess = ({ title, description, type, image, owner, id, createdAt, updatedAt }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS, payload: { title, description, type, image, owner, id, createdAt, updatedAt } });
export const addRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED, payload: error });

export const getRecipiesStart = ({ page, limit }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_START, payload: { page, limit }});
export const getRecipiesSuccess = ({ recipies }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_SUCCESS, payload: { recipies } });
export const getRecipiesFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_FAILED, payload: error });

export const getRecipeCountStart = () => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START });
export const getRecipeCountSuccess = ({ recipeCount }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_SUCCESS, payload: { recipeCount } });
export const getRecipeCountFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_FAILED, payload: error });
