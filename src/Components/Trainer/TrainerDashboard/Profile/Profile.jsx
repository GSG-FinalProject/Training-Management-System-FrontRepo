import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    linkedin: '',
    github: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/trainer/profile')
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching profile data.');
        setLoading(false);
      });
  }, []);

  const handleProfileUpdate = () => {
    setUpdating(true);
    setError('');
    setMessage('');
    axios.put('/api/trainer/profile', profile)
      .then(response => {
        setMessage('Profile updated successfully.');
        setUpdating(false);
      })
      .catch(error => {
        setError('Error updating profile.');
        setUpdating(false);
      });
  };

  return (
    <div className="profile-management">
      <h2>Update Profile</h2>

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <div className="profile-form">
          <input
            type="text"
            placeholder="First Name"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            disabled={updating}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            disabled={updating}
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={updating}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={profile.phoneNumber}
            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
            disabled={updating}
          />
          <input
            type="text"
            placeholder="LinkedIn Profile"
            value={profile.linkedin}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            disabled={updating}
          />
          <input
            type="text"
            placeholder="GitHub Profile"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            disabled={updating}
          />
          <button
            onClick={handleProfileUpdate}
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
