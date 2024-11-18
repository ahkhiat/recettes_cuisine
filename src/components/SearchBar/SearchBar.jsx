import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length >= 1) {
      onSearch(searchTerm);
    } else {
      alert('Veuillez entrer au moins une lettre pour la recherche.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-4 p-4">
    <div className="mx-auto"> 
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        maxLength={5}
        placeholder="Entrez une lettre..."
        className="p-2 border rounded-lg"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Rechercher
      </button>
    </div>
    </form>
  );
};

export default SearchBar;
