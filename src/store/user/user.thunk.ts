import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailSignIn, registerUser, updateUserData } from "../../utils/userUtils";
import { USER_ACTION_TYPES, UserEditStart, UserRegister, UserSignIn } from "./user.types";

export const fetchEmailSignIn = createAsyncThunk(USER_ACTION_TYPES.EMAIL_SIGN_IN, async (userData: UserSignIn) => {
    const res = await emailSignIn(userData);
    return res;
});

export const fetchUserRegister = createAsyncThunk(USER_ACTION_TYPES.REGISTER, async (userData: UserRegister) => {
    const res = await registerUser(userData);
    return res;
});

export const fetchUserEdit = createAsyncThunk(USER_ACTION_TYPES.EDIT_USER, async (userData: UserEditStart) => {
    const res = await updateUserData(userData);
    return res;
});
