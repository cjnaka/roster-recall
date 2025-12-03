import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamCard from '../components/TeamCard';

function HomePage() {
  const [teams, setTeams] = useState([]);
  const [league, setLeague] = useState('NBA'); // Default league
  const navigate = useNavigate();

  // API Key for TheSportsDB
  const API_URL = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${league}`;

  useEffect(() => {
    // Fetch teams when component loads or league changes
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTeams(data.teams || []))
      .catch(err => console.error("Error fetching teams:", err));
  }, [league]);

  const handleTeamClick = (teamId) => {
    navigate(`/game/${teamId}`);
  };

  return (
    <div className="container">
      <div className="league-selector">
        {['NBA', 'NFL', 'MLB'].map(l => ( // Buttons to switch leagues
          <button 
            key={l} 
            className={`league-btn ${league === l ? 'active' : ''}`}
            onClick={() => setLeague(l)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="team-grid">
        {teams.map(team => ( // Grab teams from API and dsiplay them
          <TeamCard key={team.idTeam} team={team} onClick={handleTeamClick} /> 
        ))}
      </div>
    </div>
  );
}

export default HomePage;