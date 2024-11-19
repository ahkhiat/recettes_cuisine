import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "../features/ingredientSlice";

export const store = configureStore({
    reducer: {
        ingredients : ingredientSlice
    }
})