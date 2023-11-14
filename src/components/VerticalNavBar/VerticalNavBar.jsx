import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import './VerticalNavBar.css';
import { Link } from 'react-router-dom';

export const VerticalNavBar = () => {
  return (
    <Nav className="vertical-nav flex-column">
        <NavDropdown.Item className="nav-dropdown-item" as={Link} to='/'>Inicio</NavDropdown.Item>
        <NavDropdown.Item className="nav-dropdown-item" as={Link} to="/productos">Productos</NavDropdown.Item>
        <NavDropdown.Item className="nav-dropdown-item" as={Link} to="/noticias">Noticias</NavDropdown.Item>
        <NavDropdown.Item className="nav-dropdown-item" as={Link} to="/seguridad">Seguridad</NavDropdown.Item>
    </Nav>
  );
};
