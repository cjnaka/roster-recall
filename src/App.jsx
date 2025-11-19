import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <h1>Roster Recall 🏆</h1>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:teamId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;