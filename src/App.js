
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Hotel from './components/Hotel';
import Menu from './components/Menu/Menu';
import Food_items from './components/Food_items';
// import Get_api from './components/Get_api';
import Table_bookings from './components/Table/Table_bookings';
// import Postdata from './components/Postdata';


function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Hotel/>
   <Routes>
    <Route path="/menus"  element={<Menu/>} />
    <Route path="/foodItems"  element={<Food_items/>} />
    <Route path="/tables"  element={<Table_bookings/>} />

   </Routes>
   </BrowserRouter>

   {/* <Postdata/>
   <Get_api/> */}
   {/* <Menu/> */}
    </div>
  );
}

export default App;
