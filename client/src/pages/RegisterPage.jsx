import React, { useState, useContext } from 'react';
import background_image from '../assets/background_image.webp'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !isUsernameValid) {
        setAlertMessage('The username is required');
        setAlertType('danger');
        return;
      }

      if (!email || !isEmailValid) {
        setAlertMessage('The email is required');
        setAlertType('danger');
        return;
      }

      if (!password || !isPasswordValid) {
        setAlertMessage('The password is required');
        setAlertType('danger');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name: username,
        email,
        password
      });

      if (response.status === 201) {
        const { userId } = response.data
        localStorage.setItem('userId', userId);
        setUser({ id: userId });
        setAlertMessage('Registration successful!\nNow you need to log in.');
        setAlertType('success');
        navigate('/login');
      }
    } catch (err) {
      setAlertMessage(err.response?.data?.message || 'Registration failed');
      setAlertType('danger');
    }
  };

  const validateUsername = (username) => {
    return username.length > 0;
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 1; // Example validation rule
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameValid(validateUsername(value));
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  return (
    <div className='container-fluid p-0' >
      <div className='row min-vh-100 g-0'>
        {/* Left half: Center content vertically and horizontally */}
        <div className='col-12 col-md-6 d-flex justify-content-center align-items-center min-vh-100'>
          <h1 className="display-3 display-md-5 display-sm-6 fw-bold text-primary text-uppercase m-4" style={{ letterSpacing: '0.2em', position: 'absolute', top: 40, left: 30 }}>
            The App
          </h1>
          <form className='w-50' onSubmit={handleSubmit}>
            {alertMessage && (
            <div className={`alert alert-${alertType} alert-dismissible fade show mb-4`} role="alert">
              {alertMessage}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setAlertMessage('')}
                aria-label="Close"
              ></button>
            </div>
            )}
            <p className='mb-2 text-muted fs-5'>Welcome!</p>
            <h1 className='display-6 display-md-6 display-lg-2 display-sm-6 mb-4 fw-normal'>Create your account</h1>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <div className="input-group">
                <input 
                  type="text" 
                  className={`form-control ${username ? (isUsernameValid ? 'is-valid' : 'is-invalid'): ''}`} 
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <input 
                  type="email" 
                  className={`form-control ${email ? (isEmailValid ? 'is-valid' : 'is-invalid') : ''}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input 
                  type="password" 
                  className={`form-control ${password ? (isPasswordValid ? 'is-valid' : 'is-invalid') : ''}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
              </div>
            </div>
            <div className="input-group mb-4 d-flex justify-content-between">
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
        <div className=' col-md-6 d-md-block min-vh-100' style={{backgroundImage: `url(${background_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
      </div>
    </div>
  )
}

export default RegisterPage;