import { useState } from 'react';
import CategoriesBar from '../CategoriesBar/CategoriesBar'
import SearchBar from '../SearchBar/SearchBar'

function Home() {

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (letter) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        alert('Aucun résultat trouvé.');
      }
    } catch (err) {
      setError('Erreur lors de la recherche.');
      console.error(err);
    }
  };

  return (
    <>
        <SearchBar onSearch={handleSearch}/>
        <CategoriesBar />
        {error && <div className="text-red-600">{error}</div>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="border p-4 rounded-lg shadow-lg">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
              <h3 className="mt-2">{meal.strMeal}</h3>
            </div>
          ))}
        </div>
    </>
)
}

export default Home