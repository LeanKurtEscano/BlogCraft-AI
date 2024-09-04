import { useState, useContext } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from './MyContext';

const Log = ({ setAuthenticate }) => {
  const { username, setUserName, userid, setUserID } = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setUserError("");
    setPasswordError("");
    
    try {
      // Send POST request to obtain JWT token
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      const { access, refresh } = response.data;

      if (access) {
        const newResponse = await axios.post('http://localhost:8000/api/login/', {
          username,
          password
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        })
        setUserID(newResponse.data.UserID);
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('userid', userid);
        setAuthenticate(true);
        navigate('/home');
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      // Handle unexpected errors
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
          <input
            type="password"
            name="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
