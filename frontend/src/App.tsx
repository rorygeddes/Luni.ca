import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Product from './pages/Product';
import Why from './pages/Why';
import Security from './pages/Security';
import Investors from './pages/Investors';
import Pricing from './pages/Pricing';
import Beta from './pages/Beta';
import Survey from './pages/Survey';
import Login from './pages/Login';
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
              <ScrollToTop />
              <Navigation />
              <main className="relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/why" element={<Why />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/investors" element={<Investors />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/beta" element={<Beta />} />
                  <Route path="/survey" element={<Survey />} />
                  <Route path="/login" element={<Login />} />
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
