import { createSlice } from "@reduxjs/toolkit";
import { fetchEmailSignIn, fetchUserEdit, fetchUserRegister } from "./user.thunk";

export type User = {
    email: string;
    fullName: string;
    token: string;
    id: string;
};

export type UserState = {
    readonly currentUser: User | null;
    readonly isLoading: boolean;
};

export const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, { payload }) {
            state.currentUser = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmailSignIn.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchEmailSignIn.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.success) {
                state.currentUser = payload.user;
            }
        })
        builder.addCase(fetchEmailSignIn.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = null;
        })
        builder.addCase(fetchUserRegister.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchUserRegister.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchUserEdit.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserEdit.fulfilled, (state, { payload: user }) => {
            state.isLoading = false;
            if (user) {
                state.currentUser = user;
            }
        })
        builder.addCase(fetchUserEdit.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
