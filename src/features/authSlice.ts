import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Roles} from "../utils/types-bakery-shop.ts";

interface UserInfo {
    uid: string;
    displayName?: string;
    email?: string;
}

interface AuthState {
    authUser: string;
    isAuthenticated: boolean;
    role: Roles|null;
    user?: UserInfo;
}

const initialState: AuthState = {
    authUser: "",
    isAuthenticated: false,
    role: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email: string; user?: UserInfo}>) => {
            state.authUser = action.payload.email;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setRole: (state, action: PayloadAction<Roles | null>) => {
            state.role = action.payload;
        },
        logout: (state) => {
            state.authUser = "";
            state.isAuthenticated = false;
            state.role = null;
            state.user = undefined;
        },
    },
});

export const {login, logout, setRole} = authSlice.actions;
export const authReducer = authSlice.reducer;