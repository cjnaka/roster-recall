import React from 'react';

function TeamCard({ team, onClick }) {
  return (
    <div className="team-card" onClick={() => onClick(team.idTeam)}>
      <img src={team.strTeamBadge} alt={team.strTeam} />
      <h3>{team.strTeam}</h3>
    </div>
  );
}

export default TeamCard;