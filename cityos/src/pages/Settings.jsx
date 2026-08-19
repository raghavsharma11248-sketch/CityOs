import React, { useState } from 'react';
import { User, Bell, Shield, Moon } from 'lucide-react';

const Settings = ({ darkMode, setDarkMode }) => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Manage your CityOS preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg flex flex-col items-center text-center`}>
            <div className="w-24 h-24 bg-brand-blue/20 rounded-full flex items-center justify-center mb-4 border border-brand-blue/50">
              <User size={40} className="text-brand-blue" />
            </div>
            <h2 className="text-xl font-bold">Admin User</h2>
            <p className="text-gray-400 text-sm">System Administrator</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg`}>
            <h3 className="text-lg font-bold mb-4 border-b pb-2">System Preferences</h3>
            
            <div className="space-y-4">
              {/* Push Notifications Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-brand-yellow/10 rounded-lg"><Bell className="text-brand-yellow" size={20} /></div>
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts for critical civic issues.</p>
                  </div>
                </div>
                <div 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all ${notifications ? 'bg-brand-green justify-end' : 'bg-gray-400 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Asli Working Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-brand-blue/10 rounded-lg"><Moon className="text-brand-blue" size={20} /></div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-400">Switch between dark and light themes.</p>
                  </div>
                </div>
                <div 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all ${darkMode ? 'bg-brand-green justify-end' : 'bg-gray-400 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Two Factor Auth Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-brand-red/10 rounded-lg"><Shield className="text-brand-red" size={20} /></div>
                  <div>
                    <p className="font-medium">Two-Factor Auth</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security.</p>
                  </div>
                </div>
                <div 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all ${twoFactor ? 'bg-brand-green justify-end' : 'bg-gray-400 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
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