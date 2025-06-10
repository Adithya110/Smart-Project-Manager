import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/Login.css'; // ✅ Import the CSS

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);
      alert("Login Successful");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
