import  { useState, useContext } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from './MyContext'; // Ensure this is the correct context if you're using one

const Log = ({ setAuthenticate }) => {
  const {username, setUserName, setUserID} = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      if (response.data.User) {
        setUserError("User not found");
      } else if (response.data.Pass) {
        setPasswordError("Incorrect Password");
      } else if (response.data.Success) {
        setUserID(response.data.UserID);
        setAuthenticate(true);
        navigate('/home');
      }

    } catch(error) {
      alert("Invalid Credentials")
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
          <div className="login-link">
            <p><Link to="/signup">Don't have an account? Sign Up Now</Link></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Log;
