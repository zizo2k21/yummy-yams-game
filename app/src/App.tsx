
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Auth from './views/Auth';
import Home from './views/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Auth />} />
        <Route  path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
