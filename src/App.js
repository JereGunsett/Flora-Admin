import './App.css';
import { VerticalNavBar } from './components/VerticalNavBar/VerticalNavBar';
import Home from './components/Home/home';
import Productos from './components/Productos/productos';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import EditarProducto from './components/Productos/editarProducto';
import CrearProducto from "./components/Productos/crearProducto";
import Noticias from "./components/Noticias/noticias";
import CrearNoticia from "./components/Noticias/crearNoticia";





function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          < VerticalNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/nuevo" element={<CrearProducto />} />
            <Route path="/productos/:id" element={<EditarProducto />} />
            <Route path="/noticias" element={<Noticias />}/>
            <Route path="/noticias/nueva" element={<CrearNoticia />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
