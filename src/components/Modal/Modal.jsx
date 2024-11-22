import { useDispatch } from "react-redux";
import { createAddIngredient } from "../../features/ingredientSlice";
import { useState } from "react";
import { createAddRecipe } from "../../features/recipeSlice";
import { useGetMealDetailsQuery } from "../../utils/apiSlice";

const Modal = ({ onClose, idMeal }) => {
    const dispatch = useDispatch();
   
    const [date, setDate] = useState("");
    const { data, error, isLoading } = useGetMealDetailsQuery(idMeal);
    const mealDetails = data?.meals[0];

    function handleAddRecipe()  {
        if (mealDetails && date) {
            const idRecipe = `${idMeal}-${mealDetails.strMeal}-${date}-${new Date().getTime()}`
            dispatch(
                createAddRecipe(
                    mealDetails.strMeal,
                    date, 
                    idMeal,
                    idRecipe
                )
            );
            for (let i = 1; i <= 20; i++) {
                const ingredient = mealDetails[`strIngredient${i}`];
                const measure = mealDetails[`strMeasure${i}`];
    
                if (ingredient && ingredient.trim() !== "") {
                    dispatch(
                        createAddIngredient(
                            ingredient,  
                            date,
                            measure || "Quantité non définie", 
                            idMeal,
                            idRecipe  
                        )
                    );
                }
            }
            onClose();
        } else {
            alert("Veuillez sélectionner une date !");
        }
    };

    if (isLoading) {
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"><div>Chargement...</div></div>;
    }
    if (error) {
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"><div>Erreur : {error.message}</div></div>;
    }
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
