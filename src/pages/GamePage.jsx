import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function GamePage() {
  const { teamId } = useParams();
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Game State
  const [input, setInput] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 second timer
  const [gameOver, setGameOver] = useState(false);

  // 1. Fetch Roster on Load
  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${teamId}`)
      .then(res => res.json())
      .then(data => {
        setRoster(data.player || []);
        setLoading(false);
      });
  }, [teamId]);

  // 2. Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !loading) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, loading]);

  // 3. Handle Guess Logic
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);

    // Normalize strings for easier matching with lowercase and no accents
    const cleanInput = val.toLowerCase().trim();
    
    const match = roster.find(player => {
      const cleanName = player.strPlayer.toLowerCase();
      return cleanName === cleanInput && !correctGuesses.includes(player.strPlayer);
    });

    if (match) {
      setCorrectGuesses([...correctGuesses, match.strPlayer]);
      setInput(''); // Clear input on correct guess
    }
  };

  if (loading) return <div className="container">Loading Roster...</div>;

  return (
    <div className="container">
      <Link to="/">← Back to Teams</Link>
      
      <div className="game-header">
        <h2>Name the Players!</h2>
        <div className="timer">Time: {timeLeft}s</div>
        <div className="score-board">Score: {correctGuesses.length} / {roster.length}</div>
      </div>

      {!gameOver ? (
        <div className="input-area">
          <input 
            type="text" 
            placeholder="Type a player name..." 
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
        </div>
      ) : (
        <div className="game-over">
          <h2>Time's Up!</h2>
          <p>Final Score: {correctGuesses.length}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}

      <div className="correct-list">
        {correctGuesses.map((name, i) => (
          <span key={i} className="player-tag">{name}</span>
        ))}
      </div>
    </div>
  );
}

export default GamePage;