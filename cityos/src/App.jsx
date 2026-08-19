import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import Parking from './pages/Parking';
import Issues from './pages/Issues';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default dark mode

  // Jab bhi darkMode change ho, HTML class update ho jaye
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Agar login nahi hai, toh sirf Login screen dikhegi
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Login hone ke baad poora Delhi.OS dashboard dikhega
  return (
    <BrowserRouter>
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#0B0F19] text-white' : 'bg-gray-100 text-gray-900'}`}>
        {/* Sidebar ko darkMode aur setDarkMode dono pass kiye hain */}
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <div className="flex-1 p-8 flex flex-col h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/traffic" element={<Traffic darkMode={darkMode} />} />
            <Route path="/parking" element={<Parking darkMode={darkMode} />} />
            <Route path="/issues" element={<Issues darkMode={darkMode} />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;