import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-reducer";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})