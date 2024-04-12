import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Home.css'; // Importation du fichier CSS pour les styles

import DiceSixFacesOne from '../images/dice-six-faces-one';
import DiceSixFacesTwo from '../images/dice-six-faces-two';
import DiceSixFacesThree from '../images/dice-six-faces-three';
import DiceSixFacesFour from '../images/dice-six-faces-four';
import DiceSixFacesFive from '../images/dice-six-faces-five';
import DiceSixFacesSix from '../images/dice-six-faces-six';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [canplay, setCanplay] = useState(false);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [dice, setDice] = useState([]);
  const [winner, setWinner] = useState([{}]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  useEffect(() => {
    if (user && user.username && user.role === 'admin') {
      navigate('/results');
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      if (user.nbr_games < 3 && user.winner.length === 0) setCanplay(true);
    } else {
      navigate('/login');
    }
    if (!user.username) navigate('/login');

   
  }, [dispatch, navigate]);

  // Déconnexion automatique après 15 minutes d'inactivité
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000); // 15 minutes
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Écoute des événements de souris et de clavier pour détecter l'activité de l'utilisateur
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    resetTimer(); // Lancer le compte à rebours initial

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearTimeout(timeout);
    };
  }, [handleLogout]);

  const handlePlay = async () => {
    try {
      const response = await axios.get('http://localhost:3001/game/play', {
        headers: {
          'x-access-token': token,
        },
      });
      dispatch(setUser(response.data.user));
      setMessage(response.data.message);
      setDice(response.data.dice_table);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du jeu : ', error);
    }
  };


  if (!user) {
    return null;
  }

  if (!canplay || user.winner.length > 0) {
    return (
      <div className="home-container">
        <h2>YUMS YAMS</h2>
        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
        <p className="welcome-message">{message ? message : `Bienvenue sur yums-yams, ${user.username} !`}</p>
        <div className="dice-container">
          {dice &&
            dice.map((value, index) => <DiceImage key={index} value={value} />)}
        </div>
        <p>Votre partie est terminée</p>
        <p>{user.winner.length > 0 ? `Vous avez gagné ! ${user.winner.length} patisseries` : 'Vous avez perdu !'}</p>
        {user.winner.length > 0 &&
          user.winner.map((pastry: any, index) => (
            <img key={index} src={`http://localhost:3001/images/${pastry.image}`} alt={pastry.name} />
          ))}
      </div>
    );
  } else {
    return (
      <div className="home-container">
        <h2>YUMS YAMS</h2>
        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
        <p className="welcome-message">{message ? message : `Bienvenue sur yums-yams, ${user.username} !`}</p>
        <p className="remaining-attempts">Tentatives restantes : {3 - user.nbr_games}</p>
        <div className="dice-container">
          {dice &&
            dice.map((value, index) => <DiceImage key={index} value={value} />)}
        </div>
        <button className="play-button" onClick={handlePlay}>Jouer</button>
      </div>
    );
  }
};

const DiceImage: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <DiceSixFacesOne />;
    case 2:
      return <DiceSixFacesTwo />;
    case 3:
      return <DiceSixFacesThree />;
    case 4:
      return <DiceSixFacesFour />;
    case 5:
      return <DiceSixFacesFive />;
    case 6:
      return <DiceSixFacesSix />;
    default:
      return null;
  }
};

export default Home;
