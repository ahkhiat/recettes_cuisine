import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            state.value.push(action.payload)
        },
        removeRecipe: (state, action) => {
            state.value = state.value.filter((recipe) => recipe.id !== action.payload);
        },
        clearRecipes: (state) => {
            state.value = [];
        }
    }
})

export const createAddRecipe = ( title, date, idMeal, idRecipe) => {
    // const uniqueId = `${idMeal}-${title}-${date}-${new Date().getTime()}`
    return addRecipe({
        id: idRecipe, 
        title,
        date,
        idMeal
    });
};

export const { addRecipe, removeRecipe, clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer