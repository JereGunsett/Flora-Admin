import React from 'react';
import { Nav } from 'react-bootstrap';
import './VerticalNavBar.css';

export const VerticalNavBar = () => {
  return (
    <Nav className="vertical-nav flex-column">
      <Nav.Item>Flora-Admin</Nav.Item>
      <Nav.Link href='#Inicio'>Inicio</Nav.Link>
      <Nav.Link href="#home">Productos</Nav.Link>
      <Nav.Link href="#features">Noticias</Nav.Link>
      <Nav.Link href="#pricing">Seguridad</Nav.Link>
      {/* Agrega más enlaces aquí */}
    </Nav>
  );
};
