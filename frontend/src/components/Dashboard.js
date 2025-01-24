import React, { useState } from 'react';
import axios from 'axios';

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [changePasswordMessage, setChangePasswordMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/${user.customerId}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChangePassword = async () => {
    const oldPassword = prompt('Enter your old password:');
    const newPassword = prompt('Enter your new password:');
    try {
      const response = await axios.post('http://localhost:5000/change-password', {
        customerId: user.customerId,
        oldPassword,
        newPassword,
      });
      setChangePasswordMessage(response.data.message);
    } catch (error) {
      setChangePasswordMessage(error.response?.data?.error || 'Error changing password');
    }
  };

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <button onClick={onLogout}>Logout</button>
      <button onClick={fetchProfile}>Profile</button>
      <button onClick={handleChangePassword}>Change Password</button>
      {profile && (
        <div>
          <h3>Your Profile:</h3>
          <p>Customer ID: {profile.customerId}</p>
          <p>Email: {profile.email}</p>
          <p>Account No: {profile.accountNo}</p>
        </div>
      )}
      <p>{changePasswordMessage}</p>
    </div>
  );
}

export default Dashboard;
