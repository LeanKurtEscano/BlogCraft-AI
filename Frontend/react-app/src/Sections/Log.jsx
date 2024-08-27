import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Log = () => {
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleForm = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8000/api/login/',{
        username,
        password
      },{
        headers: {
          "Content-Type": 'application/json'
        }
      });
      if (response.data.User) {
        setUserError("User is not found")

      };
      if (response.data.Pass) {
        setPasswordError("Incorrect Password")

      };

      if (response.data.Success) {
        navigate('/home')
      }; 
   
    } catch {
      console.log("Login failed");
    };

  };
  return (
    <section className="login-section">
      <div className="login-container">
        <form className="login-form" onSubmit={handleForm}>
          <h2 className="login-h2">Login</h2>
          <label className="login-label" htmlFor="email">Username:</label>
          <input type="text" name="email" className="login-input" value = {username} onChange={(e) => setUsername(e.target.value)}required />
          {userError&& <p className="error-text">{userError}</p>}
          <label className="login-label" htmlFor="password">Password:</label>
          <input type="password" name="password" className="login-input" value = {password} onChange = {(e) => setPassword(e.target.value)}required />
          {passwordError && <p className="error-text">{passwordError}</p>}
          <button className="login-button">Login</button>
          <div className="login-link">
            <p> <Link to="/signup">Don't have an account? Sign Up Now</Link></p> {/* Added Link here */}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Log;
