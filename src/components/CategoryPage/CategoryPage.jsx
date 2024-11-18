import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoriesBar from '../CategoriesBar/CategoriesBar';

const CategoryPage = () => {
  const { categoryName } = useParams();  
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        setMeals(data.meals);  
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryName]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <CategoriesBar />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals?.map((meal, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
                <Link to={`/recette/${meal.idMeal}`} className="block">

                {/* <a href={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`} className="block"> */}
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-lg" />
                {/* </a> */}
                </Link>
                <div className="mt-5 flex justify-between items-center">
                    <a href={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`} className="block">
                        <h3 className="">{meal.strMeal}</h3>
                    </a>
                    <i className="fa-solid fa-square-plus fa-xl"></i>
                </div>
            </div>
        ))}
        </div>
      </div>
  );
};

export default CategoryPage;
