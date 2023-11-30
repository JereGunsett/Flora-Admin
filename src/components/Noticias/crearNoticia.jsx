import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5009';

const CrearNoticia = () => {
    const [nuevaNoticia, setNuevaNoticia] = useState({
        titulo: '',
        cuerpo: '',
        hipervinculos: '',
        imagenes: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaNoticia((prevNoticia) => ({
            ...prevNoticia,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(nuevaNoticia);
            const response = await fetch('http://localhost:5009/noticia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaNoticia),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la noticia. Status: ${response.status}`);
            }

            const noticiaCreada = await response.json();

            // Opcional: Puedes redirigir a la página de detalles de la nueva noticia
            navigate(`/noticias/${noticiaCreada.id}`);
        } catch (error) {
            console.error('Error al crear la noticia:', error);
        }
    };

    return (
        <div>
            <h2>Crear Noticia</h2>
            <form onSubmit={handleSubmit}>
                <label>Título:
                    <input type="text" name="titulo" value={nuevaNoticia.titulo} onChange={handleChange} />
                </label>
                <label>Cuerpo:
                    <textarea name="cuerpo" value={nuevaNoticia.cuerpo} onChange={handleChange} />
                </label>
                <label>Hipervinculos:
                    <textarea name="hipervinculos" value={nuevaNoticia.hipervinculos} onChange={handleChange}></textarea>
                </label>
                <label>Imágenes:
                    <textarea name="imagenes" value={nuevaNoticia.imagenes} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Crear Noticia</button>
            </form>
        </div>
        );
};


export default CrearNoticia;