import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editarProductos.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({});
  const [categorias, setCategorias] = useState([]);
  const BASE_URL = 'http://localhost:5009';

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const responseProducto = await fetch(`${BASE_URL}/producto/${id}`);
        const dataProducto = await responseProducto.json();

        if (dataProducto && dataProducto.nombre) {
          setProducto(dataProducto);

          console.log(dataProducto);

          setFormulario({
            nombre: dataProducto.nombre || '',
            precio: dataProducto.precio || '',
            idCategoria: producto.idCategoria || '',
            cantidad: dataProducto.cantidad || '',
            descripcion: dataProducto.descripcion || '',
            imagen: dataProducto.imagen || '',
          });
        } else {
          console.error('El producto no tiene una propiedad "nombre" válida:', dataProducto);
        }
      } catch (error) {
        console.error('Error obteniendo el producto:', error);
      }
    };

    const obtenerCategorias = async () => {
      try {
        const responseCategorias = await fetch(`${BASE_URL}/categoria`);
        const dataCategorias = await responseCategorias.json();
        setCategorias(dataCategorias);
        console.log(dataCategorias);
      } catch (error) {
        console.error('Error obteniendo las categorías:', error);
      }
    };

    obtenerProducto();
    obtenerCategorias();
    }, [id]);


  const [formulario, setFormulario] = useState({
    nombre: producto.nombre || '',
    precio: producto.precio || '',
    idCategoria: producto.idCategoria || '',
    cantidad: producto.cantidad || '',
    descripcion: producto.descripcion || '',
    imagen: producto.imagen || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'categoria') {
      // Busca la categoría correspondiente y obtén su id
      const categoriaSeleccionada = categorias.find(categoria => categoria.nombre === value);
      const idCategoria = categoriaSeleccionada ? categoriaSeleccionada.id : null;

      // Actualiza el estado del formulario con el id de la categoría
      setFormulario(prevFormulario => ({ ...prevFormulario, idCategoria, categoria: value }));
    } else {
      setFormulario(prevFormulario => ({ ...prevFormulario, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formulario);

      // Asegúrate de que idCategoria tenga un valor antes de enviar la solicitud
      if (!formulario.categoria) {
        console.error('Error: idCategoria no está definida');
        return;
      }

      const response = await fetch(`${BASE_URL}/producto/${id}`, {
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

        <label>
          Precio:
          <input
            type="text"
            name="precio"
            value={formulario.precio}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Categoría:
          <select
          name="categoria"
          value={formulario.categoria}
          onChange={handleInputChange}
          >
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
            ))}
          </select>
        </label>

        <label>
          Cantidad:
          <input
            type="text"
            name="cantidad"
            value={formulario.cantidad}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Imagen:
          <input
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
    );
};

export default EditarProducto;