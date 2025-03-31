import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Roles} from "../utils/types-bakery-shop.ts";

interface AuthState {
    authUser: string;
    isAuthenticated: boolean;
    role: Roles|null;
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
        login: (state, action: PayloadAction<string>) => {
            console.log(" Reducer login and payload:", action.payload);
            state.authUser = action.payload;
            state.isAuthenticated = true;

        },
        setRole: (state, action: PayloadAction<Roles | null>) => {
            state.role = action.payload;

    },
        logout: (state) => {
            state.authUser = "";
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const {login, logout,setRole} = authSlice.actions;
export const authReducer = authSlice.reducer;
