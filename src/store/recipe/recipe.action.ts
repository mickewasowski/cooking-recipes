import { RECIPE_ACTION_TYPES } from "./recipe.types";

export const addRecipeStart = ({ title, image, type, description, userToken }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_START, payload: { title, image, type, description, userToken }});
export const addRecipeSuccess = ({ title, description, type, image, owner, id, createdAt, updatedAt }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS, payload: { title, description, type, image, owner, id, createdAt, updatedAt } });
export const addRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED, payload: error });