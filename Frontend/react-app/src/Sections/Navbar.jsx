import React, { useState } from 'react';
import '../styles/Nav.css';
import { Link } from 'react-router-dom';

const Nav = ({ isAuthenticate,setAuthenticate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className='logo-container'>
        <img
          src='#'
          className='img-inside'
          height={49}
          width={200}
        />
      </div>
      <div className='nav-container'>
        <div className='menu-icon' onClick={toggleNavBar}>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
        <div className='nav-content'>
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li className='nav-item'>
              <Link to='/home'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/about'>About</Link>
            </li>
            <li className='nav-item'>
              <Link to='/blog'>Blogs</Link>
            </li>
            {isAuthenticate ? (
              <li className='nav-item'>
                <Link to='/' onClick={() => setAuthenticate(false)}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className='nav-item'>
                <Link to='/'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
