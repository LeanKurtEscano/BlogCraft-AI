import React, { useState } from 'react';
import '../styles/Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className='logo-container'>
        <img src='#' className='img-inside' alt="Little Lemon logo" height={49} width={200}/>
      </div>
      <div className='nav-container'>
        <div className='menu-icon' onClick={toggleNavBar}>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
        <div className='nav-content'>
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li className='nav-item'><a href="/home">Home</a></li>
            <li className='nav-item'><a href="/about">About</a></li>
            <li className='nav-item'><a href="/blog">Blogs</a></li>
            <li className='nav-item'><a href="/">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
