import { useState, useContext } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { MyContext } from './MyContext';

const Log = ({ setAuthenticate }) => {
  const { username, setUserName, userid, setUserID } = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const showPassword = () => {
    setShow(!show);
  }



  const handleForm = async (e) => {
    e.preventDefault();
    setUserError("");
    setPasswordError("");

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      
      const user = response.data.UserID; 
      localStorage.setItem("userid", user);
      setUserID(user);
 

      if (response.data.Success) {
        const newResponse = await axios.post('http://localhost:8000/api/token/', {
          username,
          password
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        });

        const { access, refresh } = newResponse.data;

        if (access) {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          localStorage.setItem('username', username);
          setAuthenticate(true);
          navigate('/home');
        }
      }

    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.User) {
          setUserError("Username not found");
        } else if (errorData.Pass) {
          setPasswordError("Incorrect Password");
        } else if (errorData.Invalid) {
          alert('Username and Password required');
        } else {
          alert("Failed to log in");
        }
      } else {
        console.error("Error logging in:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <form className="login-form" onSubmit={handleForm}>
          <h2 className="login-h2">Login</h2>
          <label className="login-label" htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            className="login-input"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          {userError && <p className="error-text">{userError}</p>}
          <label className="login-label" htmlFor="password">Password:</label>
          <div className='password-container'> 
          <input
            type={show ? 'text': 'password'}
            name="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <FontAwesomeIcon
           icon={show ? faEyeSlash : faEye}
           onClick={showPassword}
           className="eye-icon"
           style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
          </div> 
          {passwordError && <p className="error-text">{passwordError}</p>}
          <button type="submit" className="login-button">Login</button>
          <div className="signup-link">
            <p><Link to="/signup">Don't have an account? Sign Up Now</Link></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Log;
