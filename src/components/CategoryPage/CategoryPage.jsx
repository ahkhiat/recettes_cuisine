import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';
import useToggle from '../../utils/hooks/useToggle';
import { useSelector } from 'react-redux';
import { useGetMealsByCategoryQuery } from '../../utils/apiSlice'; 

const CategoryPage = () => {
  const { categoryName } = useParams();  
  // const [meals, setMeals] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { data, error, isLoading } = useGetMealsByCategoryQuery(categoryName);

  // const ingredients = useSelector((state) => state.ingredients.value)
  
  // const recipes = useSelector((state) => state.recipes.value)
  // console.log(recipes)

  const handleOpenModal = (mealId) => {
    setSelectedMeal(mealId); 
    toggleModal(); 
};

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  //       const data = await response.json();
  //       setMeals(data.meals);  
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchMeals();
  // }, [categoryName]); 

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div>
    //     <CategoriesBar />
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //     {meals?.map((meal, index) => (
    //         <div key={index} className="border p-4 rounded-lg shadow-lg">
    //             <Link to={`/recette/${meal.idMeal}`} className="block">
    //                 <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-lg" />
    //             </Link>
    //             <div className="mt-5 flex justify-between items-center">
    //                   <Link to={`/recette/${meal.idMeal}`} className="block">
    //                     <h3 className="">{meal.strMeal}</h3>
    //                   </Link>
    //                 <button onClick={()=>handleOpenModal(meal.idMeal)} className="fa-solid fa-square-plus fa-xl">
    //                   {/* Bouton pour ouvrir la modale */}
    //                 </button>
    //             </div>
    //         </div>
    //     ))}
    //     </div>
    //     {/* Modale */}
    //     {isModalOpen && (
    //     <Modal onClose={toggleModal} idMeal={selectedMeal} > 
    //       <h2>Modale</h2>
    //       <button onClick={toggleModal}></button>
    //     </Modal>
    //   )}
    //   </div>

<div>
      <CategoriesBar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.meals.map((meal) => (
          <div key={meal.idMeal} className="border p-4 rounded-lg shadow-lg">
            <Link to={`/recette/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </Link>
              <button onClick={() => handleOpenModal(meal.idMeal)} className="fa-solid fa-square-plus fa-xl"></button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal} idMeal={selectedMeal} />
      )}
    </div>

  );
};

export default CategoryPage;
