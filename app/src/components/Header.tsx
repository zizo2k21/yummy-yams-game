import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, RootState } from '../store';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header: React.FC = () => {
    
const navigate = useNavigate();
const dispatch = useDispatch();
const handleLogout = () => {
  localStorage.removeItem('token');
  dispatch(clearUser());
  navigate('/login');
};
  return (
     <div className="header">
          <h2 className="header-logo">YUMMY YAM'S</h2>
          <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
        </div>
  );
};

export default Header;