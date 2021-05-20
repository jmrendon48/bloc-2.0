import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (

    <div className="App">
      
      <Router>
      <>
        <Navbar />
        <Home></Home>
      </>
    </Router>
    </div>
  );
}

export default App;
