import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); 

  const showConfirmPassword = () => {
    setShowConfirm(!showConfirm);
  }

  const showPass = () => {
    setShow(!show);
  }

  const validateName = () => {
    if (username.length < 4) {
      setUserError("Username should be a minimum of 3 characters");
      return false;  
    } else {
      setUserError('');
      return true;   
    }
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  const validatePassword = () => {
    if(password.length < 6) {
      setPasswordError("Password should be a minimum of 6 characters");
      return false;
    } else if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError("");
    setEmailError("");
    setPasswordError("");

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

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
          <div className='password-container'> 
          <input 
            type={show ? 'text': 'password'} 
            name="password" 
            className='login-input' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
           <FontAwesomeIcon
           icon={show ? faEyeSlash : faEye}
           onClick={showPass}
           className="eye-icon"
           style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
           </div>
          <label className='login-label' htmlFor="repeatPassword">Confirm Password:</label>
          <div className='password-container'>
          <input 
            type={showConfirm ? 'text': 'password'} 
            name="repeatPassword" 
            className='login-input' 
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
            required
          />
           <FontAwesomeIcon
           icon={showConfirm ? faEyeSlash : faEye}
           onClick={showConfirmPassword}
           className="eye-icon"
           style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
          </div>
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
