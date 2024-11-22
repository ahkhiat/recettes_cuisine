import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesBar from '../CategoriesBar/CategoriesBar'
import SearchBar from '../SearchBar/SearchBar'
import Modal from '../Modal/Modal';
import useToggle from '../../utils/hooks/useToggle';
import { useSearchMealsQuery } from '../../utils/apiSlice';

function Home() {
  
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useSearchMealsQuery(searchTerm, { skip: !searchTerm });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleOpenModal = (mealId) => {
    setSelectedMeal(mealId); 
    toggleModal(); 
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    // <>
    //     <SearchBar onSearch={handleSearch}/>
    //     <CategoriesBar />
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //       {data.map((meal, index) => (
    //         <div key={index} className="border p-4 rounded-lg shadow-lg">
    //             <Link to={`/recette/${meal.idMeal}`} className="block">
    //                 <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-lg" />
    //             </Link>
    //             <div className="mt-5 flex justify-between items-center">
    //               <Link to={`/recette/${meal.idMeal}`} className="block">
    //                 <h3 className="">{meal.strMeal}</h3>
    //               </Link>
    //                     <button onClick={toggleModal} className="fa-solid fa-square-plus fa-xl">
    //                   {/* Bouton pour ouvrir la modale */}
    //                 </button>
    //             </div>
    //         </div>
    //     ))}
    //     </div>
    //       {/* Modale */}
    //         {isModalOpen && (
    //           <Modal onClose={toggleModal}>
    //             <h2>Modale</h2>
    //             <button onClick={toggleModal}></button>
    //           </Modal>
    //   )}
    // </>

    <>
      <SearchBar onSearch={handleSearch} />
      <CategoriesBar />
      <div>
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
    </>
)
}

export default Home