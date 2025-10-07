import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Survey from './pages/Survey';
import PlaidOAuth from './pages/PlaidOAuth';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Plaid OAuth redirect page without navigation/footer */}
        <Route path="/plaid-oauth" element={<PlaidOAuth />} />
        
        {/* Standard pages with navigation/footer */}
        <Route 
          path="/*" 
          element={
            <div className="App min-h-screen overflow-x-hidden relative">
              <Navigation />
              <main className="relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/survey" element={<Survey />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
