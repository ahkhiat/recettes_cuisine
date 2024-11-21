import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
    <nav className="bg-blue-200 p-4 h-72 flex flex-col justify-between" style={{ 
                                              backgroundImage: "url('/assets/cuisine.jpg')", 
                                              backgroundSize: "cover"
                                              }}>

      <div className="container mx-auto flex justify-end">
        {/* <img src="/assets/cuisine.jpg" className="w-72" alt="" /> */}
        {/* <h1 className="text-black text-2xl"><strong>R</strong>ecipe<strong>I7</strong></h1> */}

        {/* Menu pour les grands écrans */}

        <div className="hidden md:flex space-x-4 ">
          <Link to="/" className="text-black hover:text-gray-400">Accueil</Link>
          <Link to="/courses" className="text-black hover:text-gray-400">Courses</Link>
          <Link to="/planning" className="text-black hover:text-gray-400">Planning</Link>

        </div>

        {/* Bouton burger pour les petits écrans */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Menu déroulant pour les petits écrans */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 flex flex-col">
          <Link to="/" className="text-white hover:text-gray-400">Accueil</Link>
          <Link to="/courses" className="text-white hover:text-gray-400">Courses</Link>
          <Link to="/planning" className="text-white hover:text-gray-400">Planning</Link>
          
        </div>
      )}
      <div className="container mx-auto">
        {/* <SearchBar onSearch={handleSearch} /> */}

        {/* Activer cette searchBar avec Redux, de façon à ne pas faire de prop drilling ni de contexte */}
      </div>
      <h1 className="text-black text-4xl flex self-center justify-self-center"><strong>R</strong>ecipes<strong>I7</strong></h1>

    </nav>
  );
};

export default Navbar;