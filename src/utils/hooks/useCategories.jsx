import { useEffect, useState } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]); // Initialisé à un tableau vide
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        // Récupère uniquement le tableau des catégories
        if (result.categories) {
          setCategories(result.categories.map(cat => cat.strCategory)); // On extrait seulement les noms
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err);
        setIsLoaded(true);
      });
  }, []);

  return { categories, isLoaded, error };
};

export default useCategories;
