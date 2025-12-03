import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isLogin) await login(email, password);
      else await signup(email, password);
      navigate('/'); // Go back home after success
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="container">
      <div className="game-header">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{padding: '10px'}}/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding: '10px'}}/>
          <button className="league-btn active" type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer', marginTop: '10px', color: '#3498db', fontWeight: 'bold'}}>
          {isLogin ? "Need an account? Sign Up" : "Have an account? Log In"}
        </p>
      </div>
    </div>
  );
}