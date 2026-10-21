import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock users — yahi "database" hai abhi ke liye
const MOCK_USERS = [
  { id: 1, email: 'admin@cityos.gov',  password: 'admin123',   role: 'admin',   name: 'Raghav Sharma' },
  { id: 2, email: 'citizen@delhi.in',  password: 'citizen123', role: 'citizen', name: 'Delhi Citizen' },
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // App start pe localStorage check karo — Remember Me ke liye
  useEffect(() => {
    const savedUser = localStorage.getItem('cityos_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function — credentials validate karo, remember me handle karo
  const login = (email, password, rememberMe = false) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const userData = { id: found.id, email: found.email, role: found.role, name: found.name };
    setUser(userData);

    if (rememberMe) {
      localStorage.setItem('cityos_user', JSON.stringify(userData));
    }

    return { success: true, role: found.role };
  };

  // Logout — state aur localStorage dono clear karo
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cityos_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — easy use ke liye
export const useAuth = () => useContext(AuthContext);
