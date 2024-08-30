import { useState } from 'react';
import Nav from './Sections/Navbar';
import Home from './Sections/Home';
import Log from './Sections/Log';
import Signup from './Sections/Signup';
import Blog from './Sections/Blog';

import { MyContextProvider } from './Sections/MyContext';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [isAuthenticate, setAuthenticate] = useState(false);
  return (
    <MyContextProvider>
    <main>
      <Router>
        <Nav isAuthenticate={isAuthenticate} setAuthenticate={setAuthenticate}/>
        <Routes>
          <Route 
            path="/home" 
            element={
              <section className="Hero">
                <Home isAuthenticate= {isAuthenticate} />
              </section>
            } 
          />
          <Route 
            path="/" 
            element={
              <section className="login-section">
                <Log setAuthenticate = {setAuthenticate}/>
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
           <Route
             path='/blog'
             element={
              <section className='blog-section'>
                < Blog isAuthenticate= {isAuthenticate}/>
              </section>
             }/>     
        </Routes>
      </Router>
    </main>
    </MyContextProvider>
  )
}

export default App;
