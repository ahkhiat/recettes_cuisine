import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesBar from '../CategoriesBar/CategoriesBar'
import SearchBar from '../SearchBar/SearchBar'
import Modal from '../Modal/Modal';
import useToggle from '../../utils/hooks/useToggle';

function Home() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearch = async (letter) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {meals.map((meal, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
                <Link to={`/recette/${meal.idMeal}`} className="block">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-lg" />
                </Link>
                <div className="mt-5 flex justify-between items-center">
                    <a href={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`} className="block">
                        <h3 className="">{meal.strMeal}</h3>
                    </a>
                    <button onClick={toggleModal} className="fa-solid fa-square-plus fa-xl">
                      {/* Bouton pour ouvrir la modale */}
                    </button>
                </div>
            </div>
        ))}
        </div>
          {/* Modale */}
            {isModalOpen && (
              <Modal onClose={toggleModal}>
                <h2>Modale</h2>
                <button onClick={toggleModal}></button>
              </Modal>
      )}
    </>
)
}

export default Home