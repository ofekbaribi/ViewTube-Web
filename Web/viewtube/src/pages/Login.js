import React from 'react';
import ReactDOM from 'react-dom/client';
import './Login.css';
import reportWebVitals from '../reportWebVitals';
import '../css/bootstrap.min.css';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert('Email or phone entered: ' + email);
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          <h1>Sign in</h1>
          <p>to continue to YouTube</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email or phone</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <a href="#" className="d-block mb-3">Forgot email?</a>
            <button type="submit" className="btn btn-primary">Next</button>
            <a href="#" className="d-block mt-3">Create account</a>
            <div className="mt-3">
              <a href="#">Learn more about using Guest mode</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;