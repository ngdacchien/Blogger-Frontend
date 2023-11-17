import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';
import '../css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError(<span style={{ color: 'red' }}>Please enter both username and password</span>);
      return;
    }
  
    try {
      const response = await api.post('/login', { username, password });
      console.log(response.data);
    } catch (error) {
      setError(<span style={{ color: 'red' }}>Invalid username or password</span>);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="content-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account ? {' '}
          <Link to="/register"><span style={{ color: 'LightSalmon' }}>Register now</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;