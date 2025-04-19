import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="plant-icon">🌱</div>
      <h1>Welcome to GreenAuth</h1>
      <p>A secure authentication system with a refreshing plant-based design.</p>
      
      <div className="home-features">
        <div className="feature">
          <div className="feature-icon">🌿</div>
          <h3>Grow Your Account</h3>
          <p>Register and watch your digital garden flourish</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🍃</div>
          <h3>Cultivate Security</h3>
          <p>Your data is protected with state-of-the-art encryption</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🌳</div>
          <h3>Sustainable Experience</h3>
          <p>A clean, efficient interface designed for your comfort</p>
        </div>
      </div>
      
      <div className="home-cta">
        <Link to="/register" className="btn btn-primary">Get Started</Link>
        <Link to="/login" className="btn btn-secondary">Sign In</Link>
      </div>
    </div>
  );
};

export default HomePage;