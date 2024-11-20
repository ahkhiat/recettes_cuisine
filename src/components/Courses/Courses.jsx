import {  useSelector, useDispatch } from "react-redux"
// import { addIngredient } from "../../features/ingredientSlice"
import { removeRecipe } from "../../features/recipeSlice";
import { removeIngredient } from "../../features/ingredientSlice";

const Courses = () => {

  const ingredients = useSelector((state)=>state.ingredients.value)
  const recipes = useSelector((state)=>state.recipes.value)
  const dispatch = useDispatch();

  const sortByDate = (array) => {
    return [...array].sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const sortedRecipes = sortByDate(recipes);
  const sortedIngredients = sortByDate(ingredients);

  const handleRemoveRecipe = (id) => {
    dispatch(removeRecipe(id));
    dispatch(removeIngredient(id));
  };

  const handleRemoveIngredient = (id) => {
    dispatch(removeIngredient(id))
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recettes</h2>
        <ul className="list-disc pl-6">
          {sortedRecipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.title}</strong> - Date prévue : {recipe.date} <br />
              id : {recipe.id} <br/>
              idMeal : {recipe.idMeal}
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
            sortedIngredients.map((ingredient, index) => (
              <li key={index}>
                Date : {ingredient.date} / 
                <strong> {ingredient.name}</strong> - 
                Quantité : {ingredient.measure} - 
                Recette : {ingredient.idMeal}
                {/* id: {ingredient.id} */}
                <button 
                    className="fa-solid fa-xmark fa-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 py-2 px-1 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                </button>
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