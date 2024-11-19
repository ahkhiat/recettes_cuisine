import { useDispatch } from "react-redux";
import { addIngredient } from "../../features/ingredientSlice";
import { useState } from "react";

const Modal = ({ idMeal, onClose }) => {
    const dispatch = useDispatch();

    // États locaux pour la date et la quantité
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleAddIngredient = () => {
        if (date && quantity > 0) {
            dispatch(
                addIngredient({
                    idMeal,
                    date,
                    quantity,
                })
            );
            onClose(); // Fermer la modale après l'ajout
        } else {
            alert("Veuillez remplir tous les champs !");
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
                        onClick={handleAddIngredient}
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
