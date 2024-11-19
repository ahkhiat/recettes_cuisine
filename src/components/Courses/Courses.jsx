import { useDispatch, useSelector } from "react-redux"
import { addIngredient } from "../../features/ingredientSlice"

const Courses = () => {

  const ingredients = useSelector((state)=>state.ingredients.value)

  return (
    <>
        <div>
            <h2>Ingrédients ajoutés</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        Recette ID : {ingredient.idMeal}, Date : {ingredient.date}, Quantité : {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default Courses