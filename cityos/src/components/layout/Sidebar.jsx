import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Car, AlertCircle, Settings, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/traffic', name: 'Live Traffic', icon: <Map size={20} /> },
    { path: '/parking', name: 'Smart Parking', icon: <Car size={20} /> },
    { path: '/issues', name: 'Civic Issues', icon: <AlertCircle size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`h-screen flex flex-col border-r transition-all duration-300 relative ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${
      darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'
    }`}>
      {/* Slide / Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-brand-blue text-white p-1 rounded-full shadow-lg hover:bg-brand-blue/80 transition-all z-10"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo / Brand Name */}
      <div className="p-6 border-b border-inherit flex items-center overflow-hidden">
        <div>
          <h1 className={`font-bold tracking-wider text-brand-blue transition-all ${isCollapsed ? 'text-lg' : 'text-2xl'}`}>
            {isCollapsed ? 'D.OS' : 'DELHI.OS'}
          </h1>
          {!isCollapsed && <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Command Center</p>}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-hidden">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            title={isCollapsed ? item.name : ''}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <div className="min-w-[20px]">{item.icon}</div>
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Theme Toggle Switch */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mb-2 rounded-xl border border-inherit flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-brand-blue" />
            <span className="text-xs font-bold uppercase tracking-wider">Dark Theme</span>
          </div>
          <div 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-all ${darkMode ? 'bg-brand-green justify-end' : 'bg-gray-400 justify-start'}`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-inherit text-xs text-gray-500 text-center">
          NCR v1.0
        </div>
      )}
    </div>
  );
};

export default Sidebar;