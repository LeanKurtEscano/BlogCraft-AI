import React from 'react'
import '../styles/Signup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatpassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        username,
        email,
        password,
        repeatPassword
      },{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setMessage(response.data.Success || response.data.Error);
      if (response.data.Success) {
        navigate('/home'); 
      }

 
    } catch {
      console.log("Failed to create account");

    };

  };

  return (
    <section className='signup-section'>
    <div className="signup-container">
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-h2'>Signup</h2>
        <label  className='login-label'htmlFor="email">Username:</label>
        <input type="text" name="text" className='login-input' value = {username}onChange={(e) => setUsername(e.target.value)} required></input>
        <label  className='login-label'htmlFor="email">Email:</label>
        <input type="email" name="email" className='login-input'value = {email} onChange = {(e) => setEmail(e.target.value)}required></input>
        <label className='login-label' htmlFor="password">Password:</label>
        <input type="password" name="password" className='login-input' value = {password}onChange = {(e) => setPassword(e.target.value)}required></input>
        <label className='login-label' htmlFor="password">Confirm password:</label>
        <input type="password" name="password" className='login-input' value={repeatPassword}onChange={(e) => setRepeatpassword(e.target.value)}required></input>
        <button className="login-button">Sign Up</button>
        <div className="login-link">
        </div>
      </form>
    </div>
  </section> 
  )
}

export default Signup