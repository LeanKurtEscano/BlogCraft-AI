import React, { useState } from 'react';
import '../styles/Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo2 from '../assets/logo2.png';
const Nav = ({ isAuthenticate, setAuthenticate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const userLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await axios.post('http://localhost:8000/api/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.Success) {
        setAuthenticate(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/'); 
      } else {
        console.error('Logout failed:', response.data.Error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className='logo-container'>
        <img
          src={logo2}
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
              <Link to='/blog'>Blogs</Link>
            </li>
            {isAuthenticate ? (
              <li className='nav-item'>
                <button onClick={userLogout} className='logout-button'>
                  Logout
                </button>
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
