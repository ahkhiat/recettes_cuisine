import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react"
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeRecipe } from '../../features/recipeSlice';

function Planning() {

  const [modalOpen, setModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.value)

  const events = recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,  
    date: recipe.date,
  }));

  const showEvent = (info) => {
    const recipeId = info.event.id;
    const recipe = recipes.find(r => r.id === recipeId); 

    if (recipe) {
      setCurrentRecipe(recipe);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecipe(null);
  };

  const handleDeleteRecipe = () => {
    if (currentRecipe) {
      dispatch(removeRecipe(currentRecipe.id)); 
      closeModal(); 
    }
  };

  return (
    <div>
    <FullCalendar 
      plugins={[ dayGridPlugin ]} 
      initialView="dayGridMonth" 
      events={events} 
      eventClick={showEvent} 
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,next today'
      }}
      selectable={true}
      editable={true}
      height="auto"
    />

    {/* Modal */}
    {modalOpen && currentRecipe && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">{currentRecipe.title}</h2>
          <p><strong>Date:</strong> {currentRecipe.date}</p>
          <p><strong>ID Meal:</strong> {currentRecipe.idMeal}</p>
          <div className="flex justify-between">
            <button 
              className="mt-4 bg-slate-400 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Fermer
            </button>
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleDeleteRecipe}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    )}
  </div>

  )
}

export default Planning