import { useDispatch } from "react-redux";
import { addIngredient, createAddIngredient } from "../../features/ingredientSlice";
import { useState, useEffect } from "react";
import { addRecipe, createAddRecipe } from "../../features/recipeSlice";



const Modal = ({ onClose, idMeal }) => {
    const dispatch = useDispatch();
    const [mealDetails, setMealDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState("");
    const [localIngredients, setLocalIngredients] = useState([]); // Stockage local des ingrédients
   
    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();
                setMealDetails(data.meals[0]); 
                console.log(data);
                
                setLoading(false);

                const ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = data.meals[0][`strIngredient${i}`];
                    if (ingredient) {
                        ingredients.push(ingredient);
                    }
                }
                setLocalIngredients(ingredients); 
                console.log(ingredients);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (idMeal) {
            fetchMealDetails();
        }
    }, [idMeal]);

    const handleAddRecipe = () => {
        if (mealDetails && date) {
            dispatch(
                createAddRecipe(
                    mealDetails.strMeal,
                    date, 
                    idMeal
                )
            );
            
            for (let i = 1; i <= 20; i++) {
                const ingredient = mealDetails[`strIngredient${i}`];
                const measure = mealDetails[`strMeasure${i}`];
    
                if (ingredient && ingredient.trim() !== "") {
                    dispatch(
                        createAddIngredient(
                            ingredient,  
                            measure || "Quantité non définie", 
                            date,
                            idMeal  
                        )
                    );
                }
            }

            onClose();
        } else {
            alert("Veuillez sélectionner une date !");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Ajouter un ingrédient</h2>
                <label className="block mb-2">
                    Date :
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </label>
                
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleAddRecipe}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
