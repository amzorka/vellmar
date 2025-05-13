import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/NavLink.scss';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <a 
      href={to} 
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </a>
  );
};

export default NavLink;