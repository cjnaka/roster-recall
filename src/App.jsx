import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import HighScoresPage from './pages/HighScoresPage';
import './App.css';

// Component for the buttons in the navbar
function NavButtons() {
  const { currentUser, logout } = useAuth();
  return (
    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      {currentUser ? (
        <>
          <Link to="/highscores">My Scores</Link>
          <button onClick={logout} style={{background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'}}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login / Sign Up</Link>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center'}}>
            <h1 style={{margin: 0}}>Roster Recall 🏆</h1>
          </Link>
          
          <NavButtons />
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:teamId" element={<GamePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/highscores" element={<HighScoresPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;