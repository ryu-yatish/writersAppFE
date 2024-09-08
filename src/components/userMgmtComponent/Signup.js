import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Reusing the CSS file

const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:8080";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSignup = () => {
    setErrorMessage(''); // Clear any previous error messages

    if (!validatePassword(formData.password)) {
      alert("Password must contain at least 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter, and be at least 8 characters long.");
      return;
    }

    axios.post(`${API_BASE_URL}/public/signup`, formData)
      .then(response => {
        setShowConfirmationPopup(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setErrorMessage('Username or email already exists.');
        } else {
          setErrorMessage('Signup error: Please try again later.');
        }
        console.error('Signup error:', error);
      });
  };

  const handleConfirm = () => {
    setConfirmationError(''); // Clear any previous confirmation errors

    axios.post(`${API_BASE_URL}/public/confirm`, {
      username: formData.username,
      confirmationCode: confirmationCode,
    })
      .then(response => {
        alert('Confirmation successful!');
        setShowConfirmationPopup(false);
        window.location.href = '/login';
      })
      .catch(error => {
        if (error.response) {
          setConfirmationError(error.response.data);
        } 
        console.error('Confirmation error:', error);
      });
  };

  const handleResendConfirmation = () => {
    axios.post(`${API_BASE_URL}/public/resend-confirmation`, {
      username: formData.username,
    })
      .then(response => {
        alert('Confirmation code resent!');
      })
      .catch(error => {
        console.error('Resend confirmation error:', error);
      });
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="login-input"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="login-input"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="login-input"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="login-input"
      />
      <button onClick={handleSignup} className="login-button">Sign Up</button>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

      {showConfirmationPopup && (
        <>
          <div className="confirmation-overlay"></div>
          <div className="confirmation-popup">
            <h3>Confirm Your Account</h3>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Enter Confirmation Code"
              className="login-input"
            />
            <button onClick={handleConfirm} className="login-button">Confirm</button>
            <button onClick={handleResendConfirmation} className="resend-button">Resend Confirmation Code</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
            
            {confirmationError && <p className="error-message">{confirmationError}</p>} {/* Display confirmation error message */}
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
