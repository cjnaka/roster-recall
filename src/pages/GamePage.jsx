import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { useAuth } from '../contexts/AuthContext';

function GamePage() {
  const { teamId } = useParams();
  const { currentUser } = useAuth();
  
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [gameOver, setGameOver] = useState(false);
  
  // Debugging Tools
  const [feedback, setFeedback] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false); 

  // Normalize the user input for comparison
  const normalize = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  // Fetch Roster
  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${teamId}`)
      .then(res => res.json())
      .then(data => {
        setRoster(data.player || []);
        setLoading(false);
      })
      .catch(err => console.error("API Error:", err));
  }, [teamId]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !loading) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      handleSaveScore();
    }
  }, [timeLeft, gameOver, loading]);

  const handleSaveScore = async () => {
    if (currentUser) {
      const scoreRef = doc(db, "users", currentUser.uid, "scores", teamId);
      const docSnap = await getDoc(scoreRef);
      
      // Grab the team name from the first player in the list
      // If roster is empty, fall back to the ID
      const teamName = roster.length > 0 ? roster[0].strTeam : teamId;
      
      // Save if new score is higher than old score
      if (!docSnap.exists() || correctGuesses.length > docSnap.data().score) {
        await setDoc(scoreRef, {
          score: correctGuesses.length,
          teamId: teamId,
          teamName: teamName,
          date: new Date().toISOString()
        });
        console.log("High Score Saved!");
      }
    }
  };

  // Check Answer Logic
  const checkAnswer = (currentInput) => {
    const cleanInput = normalize(currentInput);
    
    // Search roster for player match
    const match = roster.find(player => {
      const cleanName = normalize(player.strPlayer);
      // Check full name or last name match
      const names = cleanName.split(" ");
      const lastName = names[names.length - 1];
      
      // True if name or last name matches AND not already guessed
      return (cleanName === cleanInput || lastName === cleanInput) && 
             !correctGuesses.includes(player.strPlayer);
    });

    // Update correct guesses if match found
    if (match) {
      setCorrectGuesses([...correctGuesses, match.strPlayer]);
      setInput(''); 
      setFeedback(''); 
      return true;
    }
    return false;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = checkAnswer(input);
    if (!success) {
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setFeedback('Try Again!');
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setFeedback(''), 1000);
  };

  if (loading) return <div className="container">Loading Roster...</div>;

  // Get Team Name for Header
  const currentTeamName = roster.length > 0 ? roster[0].strTeam : "Unknown Team";

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <Link to="/" style={{textDecoration: 'none', color: '#3498db'}}>← Back to Teams</Link>
        <button onClick={() => setShowCheatSheet(!showCheatSheet)} style={{fontSize: '0.8rem', background: '#eee', border: 'none', padding: '5px', cursor: 'pointer'}}>
          {showCheatSheet ? "Hide Roster" : "Show Roster"}
        </button>
      </div>
      
      <div className="game-header">
        <h1 style={{margin: '0 0 10px 0', fontSize: '2.5rem', color: '#2c3e50'}}>{currentTeamName}</h1>
        {/* -------------------------------------- */}
        
        <h2>Name the Players!</h2>
        <div className="timer">Time: {timeLeft}s</div>
        <div className="score-board">Score: {correctGuesses.length} / {roster.length}</div>
      </div>

      {showCheatSheet && (
        <div style={{background: '#fffae6', padding: '10px', marginBottom: '20px', border: '1px solid #ffeaa7', fontSize: '0.9rem'}}>
          <strong>API Roster:</strong> {roster.map(p => p.strPlayer).join(', ')}
        </div>
      )}

      {!gameOver ? (
        <div className="input-area" style={{flexDirection: 'column', alignItems: 'center'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            <input 
              className={isShaking ? 'shake' : ''} 
              type="text" 
              placeholder="Type player name..." 
              value={input}
              onChange={handleInputChange}
              autoFocus
              style={{
                border: feedback ? '2px solid red' : '2px solid #dfe6e9',
                transition: 'all 0.2s'
              }}
            />
            <button type="submit" className="league-btn active">Enter</button>
          </form>
          {feedback && <p style={{color: 'red', fontWeight: 'bold', marginTop: '10px'}}>{feedback}</p>}
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Time's Up!</h2>
            <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '10px 0'}}>
              Final Score: {correctGuesses.length}
            </p>
            {!currentUser && (
              <p style={{color: '#7f8c8d', marginBottom: '20px'}}>
                Log in to save your high scores!
              </p>
            )}
            <button 
              onClick={() => window.location.reload()} 
              className="league-btn active"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="correct-list">
        {correctGuesses.map((name, i) => (
          <span key={i} className="player-tag">{name}</span>
        ))}
      </div>

      <style>{`
        .shake { animation: shake 0.5s; }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default GamePage;