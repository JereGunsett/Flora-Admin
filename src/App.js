import './App.css';
import { VerticalNavBar } from './components/VerticalNavBar/VerticalNavBar';
import Home from './components/Home/home';
import Productos from './components/Productos/productos';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import EditarProducto from './components/Productos/editarProducto';



function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          < VerticalNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
				<Route path=":id" element={<EditarProducto/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
