import { useState } from 'react';
import Nav from './Sections/Navbar';
import Home from './Sections/Home';
import Log from './Sections/Log';
import Signup from './Sections/Signup';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      <Router>
        <Nav />
        <Routes>
          <Route 
            path="/" 
            element={
              <section className="Hero">
                <Home />
              </section>
            } 
          />
          <Route 
            path="/login" 
            element={
              <section className="login-section">
                <Log />
              </section>
            } 
          />
          <Route
            path='/signup'
            element={
              <section className='signup-section'>
                <Signup/>

              </section>
            }
             
           />

        </Routes>
      </Router>
    </main>
  );
}

export default App;
