import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    //TODO: add the user reducer and the recipe reducer here
    user: userReducer,
});

export type IRootState = ReturnType<typeof rootReducer>