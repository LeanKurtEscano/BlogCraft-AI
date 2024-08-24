import React from 'react'
import '../styles/Signup.css'
const Signup = () => {
  return (
    <section className='signup-section'>
    <div className="signup-container">
      <form className='login-form'>
        <h2 className='login-h2'>Signup</h2>
        <label  className='login-label'for="email">Username:</label>
        <input type="text" name="text" className='login-input' required></input>
        <label  className='login-label'for="email">Email:</label>
        <input type="email" name="email" className='login-input' required></input>
        <label className='login-label' for="password">Password:</label>
        <input type="password" name="password" className='login-input'required></input>
        <label className='login-label' for="password">Confirm password:</label>
        <input type="password" name="password" className='login-input'required></input>
        <button className="login-button">Sign Up</button>
        <div className="login-link">
        </div>
      </form>
    </div>
  </section> 
  )
}

export default Signup