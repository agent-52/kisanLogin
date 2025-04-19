import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }
        
        setProfileData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div className="loading-spinner">Loading your garden...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Calculate account age in days
  const accountAge = profileData ? 
    Math.floor((new Date() - new Date(profileData.created_at)) / (1000 * 60 * 60 * 24)) : 0;
  
  // Determine plant growth stage based on account age
  let plantStage = '🌱'; // Seedling
  let stageLabel = 'Seedling';
  
  if (accountAge > 30) {
    plantStage = '🌳'; // Tree
    stageLabel = 'Mature Tree';
  } else if (accountAge > 7) {
    plantStage = '🌿'; // Growing plant
    stageLabel = 'Growing Plant';
  }

  return (
    <div className="profile-page">
      <h2>Your Garden</h2>
      {profileData && (
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-plant">
              <div className="plant-emoji">{plantStage}</div>
              <div className="plant-stage">{stageLabel}</div>
            </div>
            <div className="profile-title">
              <h3>{profileData.username}'s Garden</h3>
              <p className="profile-subtitle">Growing for {accountAge} days</p>
            </div>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{profileData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member since:</span>
              <span className="info-value">{new Date(profileData.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;