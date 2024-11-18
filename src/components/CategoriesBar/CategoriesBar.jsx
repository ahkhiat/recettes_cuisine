import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCategories from '../../utils/hooks/useCategories';

const CategoriesBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, isLoaded, error } = useCategories(); 
  const location = useLocation();

  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Menu pour les grands écrans */}
        <div className="hidden md:flex space-x-4">
          {categories.map((categorie, index) => {
            const isActive = location.pathname === `/category/${categorie}`;
            return (
                <Link
                    key={index}
                    to={`/category/${categorie}`}
                    className={`text-white hover:text-gray-300 ${isActive ? 'text-blue-600' : ''}`}
                    >
                  {categorie}
                </Link>
            )
        })}
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
        <div className="md:hidden bg-gray-700">
          {categories.map((categorie, index) => (
            <Link 
              key={index} 
              to={`/category/${categorie.strCategory}`} 
              className="text-white hover:text-gray-300"
            >
              {categorie.strCategory}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default CategoriesBar;
