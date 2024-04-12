import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Assurez-vous d'avoir axios installé
import { useNavigate } from 'react-router-dom'; // Importation du hook useHistory
import { clearUser } from '../store'; // Importation de l'action clearUser

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      navigate('/');
    } catch (error) {
      console.error('Erreur d\'inscription : ', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleSignup}>S'inscrire</button>
    </div>
  );
};

export default Auth;
