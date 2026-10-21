import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Car, AlertCircle, Settings,
  Moon, ChevronLeft, ChevronRight, LogOut, Zap, Siren, Bus, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Citizen ke liye common nav items
  const citizenNav = [
    { path: '/',          name: 'Dashboard',     icon: <LayoutDashboard size={20} /> },
    { path: '/traffic',   name: 'Live Traffic',  icon: <Map size={20} /> },
    { path: '/parking',   name: 'Smart Parking', icon: <Car size={20} /> },
    { path: '/issues',    name: 'Civic Issues',  icon: <AlertCircle size={20} /> },
    { path: '/settings',  name: 'Settings',      icon: <Settings size={20} /> },
  ];

  // Admin ke liye extra 3 tabs
  const adminOnlyNav = [
    { path: '/electricity', name: 'Electricity',       icon: <Zap size={20} /> },
    { path: '/accidents',   name: 'Accident Tracker',  icon: <Siren size={20} /> },
    { path: '/buscontrol',  name: 'Bus Control',       icon: <Bus size={20} /> },
  ];

  const navItems = user?.role === 'admin' ? [...citizenNav, ...adminOnlyNav] : citizenNav;

  const cardBg    = darkMode ? 'bg-[#1A2235] border-[#2A3441] text-white' : 'bg-white border-gray-200 text-gray-900';
  const hoverCls  = darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <div className={`h-screen flex flex-col border-r transition-all duration-300 relative ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${cardBg}`}>

      {/* Collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-500 transition-all z-10"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Brand */}
      <div className="p-6 border-b border-inherit flex items-center overflow-hidden">
        <div>
          <h1 className={`font-bold tracking-wider text-blue-400 transition-all ${isCollapsed ? 'text-lg' : 'text-2xl'}`}>
            {isCollapsed ? 'D.OS' : 'DELHI.OS'}
          </h1>
          {!isCollapsed && <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Command Center</p>}
        </div>
      </div>

      {/* Role badge */}
      {!isCollapsed && user && (
        <div className={`mx-4 mt-4 px-3 py-2 rounded-lg border flex items-center gap-2 ${
          user.role === 'admin'
            ? 'bg-red-500/10 border-red-500/20 text-red-400'
            : 'bg-green-500/10 border-green-500/20 text-green-400'
        }`}>
          <User size={14} />
          <div className="overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-wider">
              {user.role === 'admin' ? '🔴 Admin' : '👤 Citizen'}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.name}</p>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Admin-only section header */}
        {user?.role === 'admin' && !isCollapsed && (
          <>
            <p className="text-xs text-gray-600 uppercase tracking-widest px-2 pt-2 pb-1">City Services</p>
            {citizenNav.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === '/'}
                title={isCollapsed ? item.name : ''}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : hoverCls
                  }`
                }
              >
                <div className="min-w-[20px]">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
              </NavLink>
            ))}
            <p className="text-xs text-gray-600 uppercase tracking-widest px-2 pt-4 pb-1">Admin Controls</p>
            {adminOnlyNav.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                title={isCollapsed ? item.name : ''}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : hoverCls
                  }`
                }
              >
                <div className="min-w-[20px]">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
              </NavLink>
            ))}
          </>
        )}

        {/* Citizen nav OR collapsed admin nav */}
        {(user?.role !== 'admin' || isCollapsed) && navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/'}
            title={isCollapsed ? item.name : ''}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : hoverCls
              }`
            }
          >
            <div className="min-w-[20px]">{item.icon}</div>
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Dark mode toggle */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mb-2 rounded-xl border border-inherit flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Dark Theme</span>
          </div>
          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-all ${
              darkMode ? 'bg-green-500 justify-end' : 'bg-gray-400 justify-start'
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
        </div>
      )}

      {/* Logout button */}
      <div className="p-4 border-t border-inherit">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-red-400 hover:bg-red-500/10 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
