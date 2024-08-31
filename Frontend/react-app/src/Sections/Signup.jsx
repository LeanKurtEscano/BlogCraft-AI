import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError("");
    setEmailError("");
    setPasswordError("");

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

      if (response.data.User) {
        setUserError(response.data.User);
      }
      if (response.data.Email) {
        setEmailError(response.data.Email);
      }
      if (response.data.Password) {
        setPasswordError(response.data.Password);
      }
      if (response.data.Success) {
        navigate('/'); 
      }
    } catch (error) {
      console.error("Failed to create account:", error.response?.data || error.message);
      if (error.response) {
        const { data } = error.response;
        if (data.User) {
          setUserError(data.User);
        }
        if (data.Email) {
          setEmailError(data.Email);
        }
        if (data.Password) {
          setPasswordError(data.Password);
        }
        if (data.Pass) {
          setPasswordError(data.Pass);
        }
      }
    }
  };

  return (
    <section className='signup-section'>
      <div className="signup-container">
        <form className='login-form' onSubmit={handleSubmit}>
          <h2 className='login-h2'>Signup</h2>
          <label className='login-label' htmlFor="username">Username:</label>
          <input 
            type="text" 
            name="username" 
            className='login-input' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          {userError && <p className='error-text'>{userError}</p>}
          <label className='login-label' htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            className='login-input' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          {emailError && <p className='error-text'>{emailError}</p>}
          <label className='login-label' htmlFor="password">Password:</label>
          <input 
            type="password" 
            name="password" 
            className='login-input' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <label className='login-label' htmlFor="repeatPassword">Confirm Password:</label>
          <input 
            type="password" 
            name="repeatPassword" 
            className='login-input' 
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
            required
          />
          {passwordError && <p className='error-text'>{passwordError}</p>}
          <button className="login-button">Sign Up</button>
          <div className="login-link">
            <p><Link to="/">Already have an account? Click here</Link></p>
          </div>
          
        </form>
      </div>
    </section> 
  );
}

export default Signup;
