import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { IssuesProvider } from './context/IssuesContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';
import { useState, useEffect } from 'react';

import Login              from './pages/Login';
import Dashboard          from './pages/Dashboard';
import Traffic            from './pages/Traffic';
import Parking            from './pages/Parking';
import Issues             from './pages/Issues';
import Settings           from './pages/Settings';
import ElectricityMonitor from './pages/ElectricityMonitor';
import AccidentTracker    from './pages/AccidentTracker';
import BusControl         from './pages/BusControl';

// Layout wrapper — sidebar + main content
const AppLayout = ({ darkMode, setDarkMode, children }) => (
  <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${
    darkMode ? 'bg-[#0B0F19] text-white' : 'bg-gray-100 text-gray-900'
  }`}>
    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    <div className="flex-1 p-8 flex flex-col h-screen overflow-y-auto">
      {children}
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <IssuesProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes — login zaroori */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/traffic" element={
              <ProtectedRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Traffic darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/parking" element={
              <ProtectedRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Parking darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/issues" element={
              <ProtectedRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Issues darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* Admin-only routes */}
            <Route path="/electricity" element={
              <ProtectedRoute adminOnly>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ElectricityMonitor darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/accidents" element={
              <ProtectedRoute adminOnly>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <AccidentTracker darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/buscontrol" element={
              <ProtectedRoute adminOnly>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <BusControl darkMode={darkMode} />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* Koi aur URL → Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </IssuesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
