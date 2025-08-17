import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import AccountDashboard from '../components/auth/AccountDashboard';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const toggleForm = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {user ? (
          <AccountDashboard />
        ) : (
          <div className="max-w-md mx-auto">
            {authMode === 'login' ? (
              <Login toggleForm={toggleForm} />
            ) : (
              <Signup toggleForm={toggleForm} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
