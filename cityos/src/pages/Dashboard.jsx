import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Moon } from 'lucide-react';

const data = [
  { time: '00:00', traffic: 30 },
  { time: '04:00', traffic: 20 },
  { time: '08:00', traffic: 85 },
  { time: '12:00', traffic: 70 },
  { time: '16:00', traffic: 90 },
  { time: '20:00', traffic: 50 },
  { time: '24:00', traffic: 30 },
];

const Dashboard = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">City Overview</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Welcome to Delhi.OS Command Center.</p>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg`}>
          <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Live Traffic</h3>
          <p className="text-2xl font-bold text-brand-yellow">Moderate</p>
        </div>
        <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg`}>
          <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Power Grid</h3>
          <p className="text-2xl font-bold text-brand-green">Stable (98%)</p>
        </div>
        <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg`}>
          <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Active Issues</h3>
          <p className="text-2xl font-bold text-brand-red">14 Pending</p>
        </div>
      </div>

      {/* Quick Settings Bar on Dashboard */}
      <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg mb-8 flex items-center justify-between flex-wrap gap-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-lg"><Moon className="text-brand-blue" size={20} /></div>
          <div>
            <h4 className="font-bold text-sm">Quick Theme Switch</h4>
            <p className="text-xs text-gray-400">Toggle dark/light mode instantly from here.</p>
          </div>
        </div>
        <div 
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all ${darkMode ? 'bg-brand-green justify-end' : 'bg-gray-400 justify-start'}`}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
        </div>
      </div>

      {/* Traffic Activity Chart Section */}
      <div className={`${darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-900'} p-6 rounded-xl border shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">Traffic Activity (Last 24h)</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#2A3441" : "#E5E7EB"} vertical={false} />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: darkMode ? '#1A2235' : '#FFFFFF', borderColor: darkMode ? '#2A3441' : '#E5E7EB', color: darkMode ? '#F8FAFC' : '#111827' }}
                itemStyle={{ color: darkMode ? '#F8FAFC' : '#111827' }}
              />
              <Area type="monotone" dataKey="traffic" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;