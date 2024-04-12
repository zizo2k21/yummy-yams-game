import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store';
import axios from 'axios'; // Assurez-vous d'avoir axios installé

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', { email, username, password });
      dispatch(setUser(response.data));
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
