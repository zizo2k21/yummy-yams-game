import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, RootState } from '../store'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

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
  const [dice, setDice] = useState([1,1,1,1,1]);
  const [winner, setWinner] = useState([{}]);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      if (user.nbr_games <3 && user.winner.length === 0) setCanplay(true);
    } else {
      navigate('/');
    }
    if(!user.username) navigate('/')
  }, [dispatch, navigate]);

  const handlePlay = async () => {
    try {
      const response = await axios.get('http://localhost:3001/game/play', {
        headers: {
          'x-access-token': token
        }
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
      <div>
        <h2>Accueil</h2>
        <p>{message ? message : `Bienvenue sur notre application, ${user.username} !`}</p>
        <div style={{ display: 'flex' }}>
          {dice && dice.map((value, index) => (
            <DiceImage key={index} value={value} />
          ))}
        </div>
        <p>Votre partie est terminée</p>
        <p>{user.winner.length > 0 ? `Vous avez gagné ! ${user.winner.length} patisseries` : 'Vous avez perdu !'}</p>
        {user.winner.length > 0 &&  user.winner.map((pastry: any, index) => (
            <img key={index} src={`http://localhost:3001/images/${pastry.image}`} alt={pastry.name} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Accueil</h2>
        <p>{message ? message : `Bienvenue sur notre application, ${user.username} !`}</p>
        <p>tentatives restantes : {3 - user.nbr_games}</p>
        <div style={{ display: 'flex' }}>
          {dice && dice.map((value, index) => (
            <DiceImage key={index} value={value} />
          ))}
        </div>
        <button onClick={handlePlay}>Jouer</button>
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
