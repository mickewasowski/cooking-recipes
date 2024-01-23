import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { recipeReducer } from "./recipe/recipe.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    recipe: recipeReducer,
});

export type IRootState = ReturnType<typeof rootReducer>