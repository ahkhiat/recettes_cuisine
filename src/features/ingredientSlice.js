import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value : []
}

// Fonction utilitaire pour combiner les mesures
const combineMeasures = (existingMeasure, newMeasure) => {
    if (!existingMeasure) return newMeasure;
    if (!newMeasure) return existingMeasure;
  
    return `${existingMeasure} + ${newMeasure}`;
  };

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
    },
})

export const createAddIngredient = (name, date, measure = [], idMeal) => {
    const uniqueId = `${idMeal}-${name}-${date}`;
    return addIngredient({
        id: uniqueId,
        name,
        date,
        measure,
        idMeal
    });
};

export const {addIngredient, removeIngredient, clearIngredients} = ingredientSlice.actions

export default ingredientSlice.reducer