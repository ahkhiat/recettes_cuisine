import {  useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeRecipe } from "../../features/recipeSlice";
import { removeIngredient, updateIngredient } from "../../features/ingredientSlice";
import { deleteRecipeAndIngredients } from "../../features/recipeSlice";

const Courses = () => {

  const ingredients = useSelector((state)=>state.ingredients.value)
  const recipes = useSelector((state)=>state.recipes.value)
  const dispatch = useDispatch();
  const [editIngredientId, setEditIngredientId] = useState(null); // ID de l'ingrédient en cours d'édition
  const [editedIngredient, setEditedIngredient] = useState({
      name: "",
      date: "",
      measure: "",
  });


  const sortByDate = (array) => {
    return [...array].sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const sortedRecipes = sortByDate(recipes);
  const sortedIngredients = sortByDate(ingredients);

  const handleRemoveRecipe = (id) => {
    // dispatch(removeRecipe(id));
    // dispatch(removeIngredient(id));
    dispatch(deleteRecipeAndIngredients(id)) // thunk
  };

  const handleRemoveIngredient = (id) => {
    dispatch(removeIngredient(id))
  }

  const handleEditIngredient = (ingredient) => {
    setEditIngredientId(ingredient.id); 
    setEditedIngredient({
        name: ingredient.name,
        date: ingredient.date,
        measure: ingredient.measure,
    });
  };
  const handleSaveIngredient = (id) => {
    dispatch(updateIngredient({ id, ...editedIngredient }));
    setEditIngredientId(null); 
  };


  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recettes</h2>
        <ul className="list-disc pl-6">
          {sortedRecipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.title}</strong> - Date prévue : {recipe.date}
              {/* id : {recipe.id} <br/> */}
              {/* idMeal : {recipe.idMeal} */}
                <button 
                    className="fa-solid fa-xmark fa-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 py-2 px-1 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => handleRemoveRecipe(recipe.id)}
                >
                </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Ingrédients</h2>
        <ul className="list-disc pl-6">
        {sortedIngredients.length > 0 ? (
            sortedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                    {editIngredientId === ingredient.id ? (
                        // Mode édition
                        <div>
                            <input
                                type="text"
                                value={editedIngredient.name}
                                onChange={(e) =>
                                    setEditedIngredient({ ...editedIngredient, name: e.target.value })
                                }
                                className="border p-1 rounded w-1/2"
                            />
                            <input
                                type="date"
                                value={editedIngredient.date}
                                onChange={(e) =>
                                    setEditedIngredient({ ...editedIngredient, date: e.target.value })
                                }
                                className="border p-1 rounded w-1/3"
                            />
                            <input
                                type="text"
                                value={editedIngredient.measure}
                                onChange={(e) =>
                                    setEditedIngredient({ ...editedIngredient, measure: e.target.value })
                                }
                                className="border p-1 rounded w-1/3"
                            />
                            <button onClick={() => handleSaveIngredient(ingredient.id)} className="bg-green-500 text-white px-2 py-1 rounded ml-2" >
                                Sauvegarder
                            </button>
                            <button onClick={() => setEditIngredientId(null)} className="bg-gray-300 px-2 py-1 rounded ml-2" >
                                Annuler
                            </button>
                        </div>
                    ) : (
                        // Mode lecture
                        <div>
                            Date : {ingredient.date} / 
                            <strong> {ingredient.name}</strong> - 
                            Quantité : {ingredient.measure} - 
                            {/* idMeal : {ingredient.idMeal} -  */}
                            {/* idRecipe: {ingredient.idRecipe} -  */}
                            {/* id: {ingredient.id} */}
                            <button
                                onClick={() => handleEditIngredient(ingredient)}
                                className="fa-solid fa-pencil fa-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 py-2 px-1 border border-blue-500 hover:border-transparent rounded"
                            >
                                
                            </button>
                            <button
                                onClick={() => handleRemoveIngredient(ingredient.id)}
                                className="fa-solid fa-trash fa-xs bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white ms-2 py-2 px-1 border border-red-500 hover:border-transparent rounded"
                            >
                            </button>
                        </div>

                    )}
                </li>
            ))
        ) : (
            <p>Aucun ingrédient ajouté pour l'instant.</p>
        )}
        </ul>
      </div>
    </div>
  );
}

export default Courses