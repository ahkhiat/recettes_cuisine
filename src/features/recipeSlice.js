import { createSlice } from "@reduxjs/toolkit";
import { removeIngredient } from "./ingredientSlice";

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

// Thunk
export const deleteRecipeAndIngredients = (recipeId) => async (dispatch, getState) => {
    try {
        const ingredients = getState().ingredients.value.filter(
            (ingredient) => ingredient.idRecipe === recipeId
        );
        ingredients.forEach((ingredient) => {
            dispatch(removeIngredient(ingredient.id)); 
        });
        dispatch(removeRecipe(recipeId)); 
    } catch (error) {
        console.error("Erreur lors de la suppression de la recette et des ingrédients associés", error);
    }
};

export const { addRecipe, removeRecipe, clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer