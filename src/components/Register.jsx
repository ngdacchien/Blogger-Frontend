import React, { useState } from 'react';
import api from '../service/api';
import { Link } from 'react-router-dom';
import '../css/Login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        username,
        password,
        email,
        phone,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="content-container">
        <h2>Register</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
          />
          <button onClick={handleRegister} className="register-button">Register</button>
        </form>
        <p>
          Do you already have an account ?{' '}
          <Link to="/login"><span style={{ color: 'LightSalmon' }}>Login now</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Register;