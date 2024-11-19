import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate(-1); 
  };

  return (
    <button
      onClick={handleRetour}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Retour
    </button>
  );
};

export default BackButton;
