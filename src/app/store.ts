import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/authSlice.ts";
import {productsReducer} from "../features/productSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        'currProduct':productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
