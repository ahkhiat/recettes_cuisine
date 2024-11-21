import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value : []
}

export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            state.value.push(action.payload);
          },
        removeIngredient: (state, action) => {
            state.value = state.value.filter((ingredient) => ingredient.id !== action.payload);
        },
        clearIngredients: (state) => {
            state.value = []; 
        },
        updateIngredient: (state, action) => {
            const { id, name, date, measure } = action.payload;
            const index = state.value.findIndex((ingredient) => ingredient.id === id);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], name, date, measure };
            }
        },
    },
})

export const createAddIngredient = (name, date, measure, idMeal, idRecipe) => {
    const uniqueId = `${idMeal}-${name}-${date}-${measure}-${new Date().getTime()}`;
    return addIngredient({
        id: uniqueId,
        name,
        date,
        measure,
        idMeal,
        idRecipe,

    });
};

export const {addIngredient, removeIngredient, clearIngredients, updateIngredient} = ingredientSlice.actions

export default ingredientSlice.reducer