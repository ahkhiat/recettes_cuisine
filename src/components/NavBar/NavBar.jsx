import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className="bg-blue-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/assets/oil-tomatoes.jpg" className="w-72" alt="" />
        <h1 className="text-black text-2xl"><strong>R</strong>ecipe<strong>I7</strong></h1>

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
    </nav>
  );
};

export default Navbar;