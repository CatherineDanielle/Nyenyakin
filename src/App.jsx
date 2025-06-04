import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';
import Tips from './pages/Tips';
import Good from './pages/Goodpage';
import Bad from './pages/Badpage'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/tips/:articleId" element={<Tips />} />
        <Route path="/good" element={<Good />} /> 
        <Route path="/bad" element={<Bad />} /> 
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
