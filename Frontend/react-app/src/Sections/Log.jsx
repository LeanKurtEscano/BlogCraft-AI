import React from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Log = () => {
  return (
    <section className="login-section">
      <div className="login-container">
        <form className="login-form">
          <h2 className="login-h2">Login</h2>
          <label className="login-label" htmlFor="email">Email:</label>
          <input type="email" name="email" className="login-input" required />
          
          <label className="login-label" htmlFor="password">Password:</label>
          <input type="password" name="password" className="login-input" required />
          
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
