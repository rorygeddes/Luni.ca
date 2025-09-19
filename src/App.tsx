import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Survey from './pages/Survey';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-system-bg text-system-text overflow-x-hidden transition-colors duration-300">
        <Navigation />
        <main className="bg-system-bg transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
