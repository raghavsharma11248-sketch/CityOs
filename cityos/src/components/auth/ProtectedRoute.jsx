import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// adminOnly = true pass karo toh citizen block ho jayega
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  // Login nahi hai → Login page pe bhejo
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only page pe citizen aaya → Dashboard pe bhejo
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
