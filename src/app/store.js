import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "../features/ingredientSlice";
import recipeSlice from "../features/recipeSlice";
import { apiSlice } from "../utils/apiSlice";

export const store = configureStore({
    reducer: {
        ingredients : ingredientSlice,
        recipes : recipeSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})