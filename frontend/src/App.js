import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Register />} />
        <Route path="/Register" element={<Register />} />
        {/* Protect the Dashboard route using PrivateRoute */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
