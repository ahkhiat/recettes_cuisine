import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value : []
}

export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers : {
        addIngredient: (state, action) => {
            const { recipeId, date, quantity } = action.payload
            state.value.push({recipeId, date, quantity})
        },
        resetIngredients: (state) => {
            state.value = []
        }
    }
})

export const {addIngredient, resetIngredients} = ingredientSlice.actions

export default ingredientSlice.reducer