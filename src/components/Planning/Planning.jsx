import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react"
import { useSelector } from 'react-redux';

function Planning() {

  const recipes = useSelector((state) => state.recipes.value)
  const events = recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,  
    date: recipe.date,
  }));

  return (

    <FullCalendar 
      plugins={[ dayGridPlugin ]} 
      initialView="dayGridMonth" 
      events={events} 
      // eventClick={showEvent} 
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,next today'
      }}
      selectable={true}
      editable={true}
      height="auto"
    />
  )
}

export default Planning