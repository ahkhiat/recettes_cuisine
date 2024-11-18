import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/NavBar/NavBar';
import Courses from './components/Courses/Courses';
import Planning from './components/Planning/Planning';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ReceipePage from './components/ReceipePage/ReceipePage';


function Router() {
  return (
        <BrowserRouter future={{ 
            v7_startTransition: true,
            v7_relativeSplatPath: true 
         }}>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/category/:categoryName" element={<CategoryPage />} /> 
                    <Route path="/recette/:idMeal" element={<ReceipePage />} /> 
                    <Route path="/courses" element={<Courses />}></Route>
                    <Route path="/planning" element={<Planning />}></Route>
                 
                </Routes>
        </BrowserRouter>
)
}

export default Router