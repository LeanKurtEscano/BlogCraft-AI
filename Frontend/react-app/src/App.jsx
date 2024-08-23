import { useState } from 'react'
import Nav from './Sections/Navbar';
import Home from './Sections/Home';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <main>
      < Nav/>
      <section className='Hero'>
      < Home/>
      </section>

    </main>
    
  )
}

export default App
