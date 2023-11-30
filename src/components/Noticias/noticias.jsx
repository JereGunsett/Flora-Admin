import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './noticias.css';

const BASE_URL = 'http://localhost:5009';

function Noticias(){
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseNoticias = await fetch(`${BASE_URL}/noticia`);
                if (!responseNoticias.ok) {
                    throw new Error(`Error al obtener productos. Status: ${responseNoticias.status}`);
                }
                
                const dataNoticias = await responseNoticias.json();
                const listaNoticias = dataNoticias?.list || [];
                
                setNoticias(listaNoticias);
            } catch (error) {
                console.error('Error al obtener datos: ', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    
    const handleEdit = (id) => {
        console.log(`Editar noticia con ID ${id}`);
    };
    const handleDelete = (id) => {
        console.log(`Eliminar producto con ID ${id}`);
    };
    
    return (
        <div>
            <h1>Noricias</h1>
            <button onClick={() => navigate('/noticias/nueva')}>Agregar Noticia</button>
            {loading ? (
                <p>Cargando productos...</p>
                ) : noticias.length === 0 ? (
                    <p>No hay noticias disponibles.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Cuerpo</th>
                                    <th>Imagenes</th>
                                    <th>Hipervinculos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {noticias.map((noticia) => (
                                    <tr key={noticia.id}>
                                        <td>{noticia.titulo}</td>
                                        <td>{noticia.cuerpo}</td>
                                        <td>{noticia.imagenes}</td>
                                        <td>{noticia.hipervinculos}</td>
                                        <td>
                                            <button onClick={() => navigate(`/noticias/${noticia.id}`)}>Editar</button>
                                            <button onClick={() => handleDelete(noticia.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                        )}
        </div>
        );
}

export default Noticias;