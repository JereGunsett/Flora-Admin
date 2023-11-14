import './App.css';
import { VerticalNavBar } from './components/VerticalNavBar/VerticalNavBar';
import Home from './components/Home/home';
import Productos from './components/Productos/productos';

import { BrowserRouter,Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          < VerticalNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
