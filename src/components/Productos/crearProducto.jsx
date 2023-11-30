import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearProducto = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const BASE_URL = 'http://localhost:5009';

    useEffect(() => {
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
        obtenerCategorias();
        }, []);

    const [formulario, setFormulario] = useState({
        nombre: '',
        precio: '',
        cantidad: '',
        descripcion: '',
        imagen: '',
        idCategoria: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'categoria') {
            const categoriaSeleccionada = categorias.find((categoria) => categoria.id === parseInt(value));

            setFormulario((prevFormulario) => ({
                ...prevFormulario,
                idCategoria: categoriaSeleccionada ? categoriaSeleccionada.id.toString() : '',
            }));
        } else {
            setFormulario((prevFormulario) => ({ ...prevFormulario, [name]: value }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const precio = parseInt(formulario.precio, 10);
            const cantidad = parseInt(formulario.cantidad, 10);
            const idCategoria = parseInt(formulario.idCategoria, 10);

            console.log("Cuerpo de la solicitud POST:", JSON.stringify({ ...formulario, precio, cantidad, idCategoria }));
            const response = await fetch(`${BASE_URL}/producto/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formulario,
                    precio,
                    cantidad,
                    idCategoria,  // Usar el mismo nombre que en el formulario
                }),
            });

            // Resto del código...
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Producto</h2>
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
                    <select name="categoria" value={formulario.categoria} onChange={handleInputChange}>
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
                <button type="submit">Guardar Producto</button>
            </form>
        </div>
        );
};

export default CrearProducto;