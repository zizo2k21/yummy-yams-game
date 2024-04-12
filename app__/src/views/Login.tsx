import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser} from '../store';
import axios from 'axios'; // Assurez-vous d'avoir axios installé
import { useNavigate  } from 'react-router-dom'; // Importation du hook useHistory

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      //mettre le token dans le localStorage
      localStorage.setItem('token', response.data.token)

      // Mettre à jour les informations de l'utilisateur dans le store Redux avec les données de la réponse
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
