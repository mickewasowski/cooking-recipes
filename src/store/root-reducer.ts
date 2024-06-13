import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { recipeReducer } from "./recipe/recipe.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    recipe: recipeReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
