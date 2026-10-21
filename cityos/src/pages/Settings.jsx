import React from 'react';
import { User, Moon, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = ({ darkMode, setDarkMode }) => {
  const { user } = useAuth();

  const card = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Manage your system preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className={`col-span-1 ${card} p-6 rounded-xl border shadow-lg flex flex-col items-center text-center h-fit`}>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2 ${
            user?.role === 'admin'
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-blue-500/10 border-blue-500/30'
          }`}>
            {user?.role === 'admin'
              ? <Shield className="text-red-400" size={40} />
              : <User className="text-blue-500" size={40} />
            }
          </div>
          <h2 className="text-xl font-bold mb-1">{user?.name || 'Guest'}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${
            user?.role === 'admin'
              ? 'text-red-400 bg-red-500/10 border-red-500/20'
              : 'text-green-400 bg-green-500/10 border-green-500/20'
          }`}>
            {user?.role === 'admin' ? '🔴 Administrator' : '👤 Citizen'}
          </span>
        </div>

        {/* System Preferences */}
        <div className={`col-span-2 ${card} p-6 rounded-xl border shadow-lg`}>
          <h3 className={`text-lg font-bold mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
            System Preferences
          </h3>

          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Moon className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Dark Mode</h4>
                  <p className="text-sm text-gray-400">Switch between dark and light themes.</p>
                </div>
              </div>
              <div
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all ${
                  darkMode ? 'bg-green-500 justify-end' : 'bg-gray-400 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>

            {/* Account Info row */}
            <div className={`p-4 rounded-xl border ${darkMode ? 'border-[#2A3441] bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-400">Account Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role</span>
                  <span className={`font-bold ${user?.role === 'admin' ? 'text-red-400' : 'text-green-400'}`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Citizen'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
