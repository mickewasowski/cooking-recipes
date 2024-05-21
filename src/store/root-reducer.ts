import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { recipeReducer } from "./recipe/recipe.reducer";
import { routingReducer } from "./routing/routing.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    recipe: recipeReducer,
    routing: routingReducer,
});

export type IRootState = ReturnType<typeof rootReducer>