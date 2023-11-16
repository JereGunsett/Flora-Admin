import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({});
  const BASE_URL = 'http://localhost:5009';

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Productos/${id}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error obteniendo el producto:', error);
      }
    };

    obtenerProducto();
  }, [id]);

  const [formulario, setFormulario] = useState({
    nombre: producto.nombre || '',
    precio: producto.precio || '',
    categoria: producto.categoria || '',
    cantidad: producto.cantidad || '',
    descripcion: producto.descripcion || '',
    imagen: producto.imagen || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${BASE_URL}/Productos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formulario),
        });
    
        if (response.ok) {
          // Manejar el éxito de la actualización
          console.log('Producto actualizado con éxito');
          navigate(`/productos`);
        } else {
          // Manejar el error
          console.error('Error al actualizar el producto', response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleInputChange}
          />
        </label>
        {/* Otros campos del formulario */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};


export default EditarProducto;