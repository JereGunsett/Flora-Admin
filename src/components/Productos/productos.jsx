import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './productos.css';

const BASE_URL = 'http://localhost:5009';

export const Productos = () => {
  const fetchdata = async () => {
    try {
        let response = await fetch(`${BASE_URL}/Producto`);
        let json = await response.json();

        setProductos(json);

        console.log(json);
      } catch(e) {

      } finally {
        setLoading(false);
      }
    }
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);
    useEffect(() => {
      fetchdata();
    }, []);

    return (
      <>
      
        {
          loading?
          <div className="loader">
            <ImSpinner3 className="loader-icon" />
          </div> :
          <Table striped border hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                productos.map((producto) => {
                  return (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.cantidad}</td>
                      <td>{producto.descripcion}</td>
                      <td><img src={producto.imagen} alt="imagen"/></td>
                      <td>
                        <Link to={`/productos/${producto.id}`}>
                          <button className="btn btn-primary">Editar</button>
                        </Link>
                        <button className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>);
                })
              }
            </tbody>
          </Table>
        }
      </>
    );
}

export default Productos;