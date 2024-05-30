import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios'; // Assurez-vous d'avoir axios installé
import { useNavigate } from 'react-router-dom'; // Importation du hook useHistory
import { clearUser } from '../store'; // Importation de l'action clearUser
import './Login.css';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook pour la navigation

  // Effacer le state Redux dès que le composant est monté
  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]); // Ne dépend d'aucune variable, donc vide []

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3001/auth/register', { email, username, password });
      // Rediriger vers la page de connexion après l'inscription réussie
      navigate('/login');
    } catch (error: AxiosError | any) {
      if (error.response && error.response.data && error.response.data.message) {
        // Si la réponse contient un message d'erreur, le stocker dans la state errorMessage
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Erreur d\'inscription : ', error);
      }
    }
  };

  return (
    <><h1 className='title-game'>YUMMY YAM'S</h1><div className='login-container'></div><div className='login-container'>
      <h2>Inscription</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleSignup}>S'inscrire</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Afficher le message d'erreur s'il existe */}
    </div></>
  );
};

export default Auth;
