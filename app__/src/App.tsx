
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Auth from './views/Auth';
import Home from './views/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route  path="/auth" element={<Auth />} />
        <Route  path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
