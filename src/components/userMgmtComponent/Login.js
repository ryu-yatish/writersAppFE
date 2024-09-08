import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'; // Import the CSS file
import './Login.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:8080";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setErrorMessage(''); // Clear any previous error messages

    axios.post(`${API_BASE_URL}/public/login`, { username, password })
      .then(response => {
        const token = response.data.accessToken;
        localStorage.setItem('authToken', token); 
        window.location.href = '/';
      })
      .catch(error => {
        if (error.response) {
          // Handle specific error responses
          if (error.response.status === 401) {
            setErrorMessage('Invalid credentials. Please try again.');
          } else if (error.response.status === 500) {
            setErrorMessage('Server error. Please try again later.');
          } else {
            setErrorMessage('An error occurred. Please try again.');
          }
        } else {
          setErrorMessage('Network error. Please check your connection.');
        }
        console.error('Login error:', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>

      {/* Guest login credentials note */}
      <div className="guest-login-note">
        <strong>Guest Login Information:</strong><br />
        To explore the application with guest access, use the following credentials:<br /><br />
        <strong>Username:</strong> guestLogin<br />
        <strong>Password:</strong> PASSword@123<br /><br />
        <em>Note:</em> This account is public, and anyone can modify its contents. Please be mindful when using it.
      </div>
    </div>
  );
};

export default Login;
