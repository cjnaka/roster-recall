import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HighScoresPage() {
  const [scores, setScores] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchScores() {
      if (currentUser) {
        // Read from Firestore: users -> uid -> scores
        const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "scores"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setScores(data);
      }
    }
    fetchScores();
  }, [currentUser]);

  if (!currentUser) return <div className="container">Please Log In to see scores.</div>;

return (
    <div className="container">
      <div className="game-header">
        <h2>My High Scores 🏆</h2>
        {scores.length === 0 && <p>No games played yet.</p>}
        
        <div className="team-grid">
          {scores.map(s => (
            <div key={s.id} className="team-card" style={{cursor: 'default'}}>
               {/* It tries to show the Name and if the Name is missing, it shows the ID */}
               <h3>{s.teamName || `Team ID: ${s.teamId}`}</h3> 

               <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71'}}>{s.score}</p>
               <p>{new Date(s.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="league-btn" style={{marginTop: '20px', display: 'inline-block'}}>Back Home</Link>
      </div>
    </div>
  );
}