import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoriesBar from '../CategoriesBar/CategoriesBar';

const ReceipePage = () => {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await response.json();
        setMeal(data.meals[0]);  
        // console.log(data.meals[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMeal();
  }, [idMeal]);  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!meal) return <div>No meal found</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} (${measure})`);
    }
  }

  return (
    <div>
    <CategoriesBar />
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-2 mt-2">{meal.strMeal}</h1>

      <div className="flex flex-col md:flex-row items-start mt-10">
        {/* Image */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Détails de la recette */}
        <div className="md:w-2/3 md:pl-6">
          <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
          <ul className="list-disc pl-5 mb-4">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm">{ingredient}</li>
            ))}
          </ul>
        </div>


        
      </div>


      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <p className="text-lg">{meal.strInstructions}</p>

          {/* Optionnel: Lien vers la vidéo YouTube */}
          {meal.strYoutube && (
            <div className="mt-4">
              <a 
                href={meal.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Watch the recipe on YouTube
              </a>
            </div>
          )}

    </div>
  </div>
  );
};

export default ReceipePage;
