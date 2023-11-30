import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './productos.css';

const BASE_URL = 'http://localhost:5009';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos
        const responseProductos = await fetch(`${BASE_URL}/producto/type/1`);
        if (!responseProductos.ok) {
          throw new Error(`Error al obtener productos. Status: ${responseProductos.status}`);
        }

        const dataProductos = await responseProductos.json();
        const listaProductos = dataProductos?.list || [];
        console.log(listaProductos);
        setProductos(listaProductos);

        // Obtener categorías
        const responseCategorias = await fetch(`${BASE_URL}/categoria`);
        if (!responseCategorias.ok) {
          throw new Error(`Error al obtener categorías. Status: ${responseCategorias.status}`);
        }
        const dataCategorias = await responseCategorias.json();
        setCategorias(dataCategorias);
      } catch (error) {
        console.error('Error al obtener datos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

  const handleEdit = (id) => {
    console.log(`Editar producto con ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar producto con ID ${id}`);
  };

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={() => navigate('/productos/nuevo')}>Agregar Producto</button>
      {loading ? (
        <p>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.descripcion}</td>
                    <td>
                      {categorias.find((categoria) => categoria.id === producto.idCategoria)?.nombre || 'Sin categoría'}
                    </td>
                    <td>
                      <button onClick={() => navigate(`/productos/${producto.id}`)}>Editar</button>
                      <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                  ))}
              </tbody>
            </table>
            )}
    </div>
    );
}

export default Productos;