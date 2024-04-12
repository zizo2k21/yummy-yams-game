import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from '../store';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user); // Assurez-vous d'importer RootState depuis '../store'

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers la page "/home"
    if (user && user.username) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', response.data.token)
      dispatch(setUser(response.data));
      navigate('/home');
    } catch (error) {
      console.error('Erreur de connexion : ', error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
