import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from '../store';
import axios, { AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user); // Assurez-vous d'importer RootState depuis '../store'

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers la page "/home"
    if (user && user.username) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', response.data.token)
      dispatch(setUser(response.data));
      navigate('/');
    } catch (error: AxiosError | any) {
      if (error.response && error.response.status === 400) {
        // Si la réponse a un code 400, afficher le message d'erreur
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Erreur de connexion : ', error);
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Rediriger vers la page d'inscription
  };

  return (
    <div className='login-container'>
      <h2>Connexion</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Afficher le message d'erreur s'il existe */}
      <p>Vous n'avez pas de compte ?</p>
      <button onClick={handleRegisterRedirect}>Créer un compte</button> {/* Bouton pour rediriger vers la page d'inscription */}
    </div>
  );
};

export default Login;
