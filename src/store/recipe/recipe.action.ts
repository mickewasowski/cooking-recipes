import { RECIPE_ACTION_TYPES } from "./recipe.types";

export const addRecipeStart = ({ title, image, type, description, userToken, additionalData }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_START, payload: { title, image, type, description, userToken, additionalData }});
export const addRecipeSuccess = ({ title, description, type, image, owner, additionalData, id, createdAt, updatedAt }) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS, payload: { title, description, type, image, owner, additionalData, id, createdAt, updatedAt } });
export const addRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED, payload: error });

export const getRecipiesStart = ({ page, limit }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_START, payload: { page, limit }});
export const getRecipiesSuccess = ({ recipies }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_SUCCESS, payload: { recipies } });
export const getRecipiesFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPIES_FAILED, payload: error });

export const getRecipeCountStart = () => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START });
export const getRecipeCountSuccess = ({ totalRecipeCount }) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_SUCCESS, payload: { totalRecipeCount } });
export const getRecipeCountFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_FAILED, payload: error });

export const updateRecipeStart = ({ _id, title, image, type, description, userToken, additionalData }) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, payload: { _id, title, image, type, description, userToken, additionalData }});
export const updateRecipeSuccess = ({ id, title, description, type, image, owner, additionalData, createdAt, updatedAt }) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_SUCCESS, payload: { id, title, description, type, image, owner, additionalData, createdAt, updatedAt } });
export const updateRecipeFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.UPDATE_RECIPE_FAILED, payload: error });

export const searchRecipiesStart = (searchString: string) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START, payload: searchString });
export const searchRecipiesSuccess = ({ recipies, count }) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_SUCCESS, payload: { recipies, count } });
export const searchRecipiesFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.SEARCH_RECIPIES_FAILED, payload: error });

export const getRecipiesForOwnerStart = ({ ownerId, userToken }) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START, payload: { ownerId, userToken }});
export const getRecipiesForOwnerSuccess = ({ recipies, count }) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_SUCCESS, payload: { recipies, count }});
export const getRecipiesForOwnerFailed = (error: Error) => ({ type: RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_FAILED, payload: error });
