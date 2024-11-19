import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value : []
}

export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers : {
        addIngredient: (state, action) => {
            state.value.push(action.payload)
        },
        resetIngredients: (state) => {
            state.value = []
        }
    }
})

export const {addIngredient, resetIngredients} = ingredientSlice.actions

export default ingredientSlice.reducer