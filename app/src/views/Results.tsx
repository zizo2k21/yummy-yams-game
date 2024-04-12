import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store';
import { useNavigate } from 'react-router-dom';
import './Results.css'; // Importer le fichier CSS avec les styles

interface Winner {
  name: string;
  image: string;
  date: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  nbr_games: number;
  winner: Winner[];
  role: string;
}

const Results: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    } else {
      const fetchResults = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token non trouvé');
            return;
          }
          const response = await axios.get<User[]>('http://localhost:3001/admin/results', {
            headers: {
              'x-access-token': token
            }
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des résultats : ', error);
        }
      };
  
      fetchResults();
    }
  }, [user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="results-container">
      <h2 className="results-header">Résultats des gagnants</h2>
      <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
      <table className="results-table">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Patisseries</th>
            <th>Date de gain</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <ul className="results-list">
                  {user.winner.map((winner, index) => (
                    <li key={index}>{winner.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="results-list">
                  {user.winner.map((winner, index) => (
                    <li key={index}>{winner.date}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
