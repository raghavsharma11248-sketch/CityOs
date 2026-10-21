import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const ZONES = [
  { id: 'Z1', name: 'North Delhi',   area: 'Rohini, Pitampura, Shalimar Bagh', status: 'Normal',      load: 72, lastUpdated: '2 min ago' },
  { id: 'Z2', name: 'South Delhi',   area: 'Saket, Vasant Kunj, Mehrauli',     status: 'Fluctuating', load: 89, lastUpdated: '5 min ago' },
  { id: 'Z3', name: 'East Delhi',    area: 'Preet Vihar, Mayur Vihar, Laxmi Nagar', status: 'Outage', load: 0,  lastUpdated: '12 min ago' },
  { id: 'Z4', name: 'West Delhi',    area: 'Janakpuri, Dwarka, Uttam Nagar',   status: 'Normal',      load: 65, lastUpdated: '1 min ago' },
  { id: 'Z5', name: 'Central Delhi', area: 'Connaught Place, Karol Bagh',      status: 'Normal',      load: 58, lastUpdated: '3 min ago' },
  { id: 'Z6', name: 'NCR — Noida',   area: 'Sector 18, 62, Greater Noida',     status: 'Fluctuating', load: 91, lastUpdated: '8 min ago' },
];

const statusConfig = {
  Normal:      { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',  bar: '#22c55e', icon: <CheckCircle size={18} className="text-green-400" /> },
  Fluctuating: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', bar: '#eab308', icon: <AlertTriangle size={18} className="text-yellow-400" /> },
  Outage:      { color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',       bar: '#ef4444', icon: <Zap size={18} className="text-red-400" /> },
};

const ElectricityMonitor = ({ darkMode }) => {
  const [zones, setZones] = useState(ZONES);

  const card = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  const normalCount      = zones.filter(z => z.status === 'Normal').length;
  const fluctuatingCount = zones.filter(z => z.status === 'Fluctuating').length;
  const outageCount      = zones.filter(z => z.status === 'Outage').length;

  const chartData = zones.map(z => ({ name: z.name.replace(' Delhi', ''), load: z.load, status: z.status }));

  // Simulate refresh (random fluctuation)
  const handleRefresh = () => {
    setZones(prev => prev.map(z => ({
      ...z,
      load: z.status === 'Outage' ? 0 : Math.min(99, Math.max(40, z.load + Math.floor(Math.random() * 10 - 5))),
      lastUpdated: 'Just now',
    })));
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">⚡ Electricity Monitor</h1>
          <p className="text-gray-400 mt-1">Real-time power grid status across Delhi NCR zones.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🟢 Normal</p>
          <p className="text-4xl font-bold text-green-400">{normalCount}</p>
          <p className="text-xs text-gray-500 mt-1">zones operating fine</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🟡 Fluctuating</p>
          <p className="text-4xl font-bold text-yellow-400">{fluctuatingCount}</p>
          <p className="text-xs text-gray-500 mt-1">zones unstable</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🔴 Outage</p>
          <p className="text-4xl font-bold text-red-400">{outageCount}</p>
          <p className="text-xs text-gray-500 mt-1">zones down</p>
        </div>
      </div>

      {/* Zone cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {zones.map(zone => {
          const cfg = statusConfig[zone.status];
          return (
            <div key={zone.id} className={`${card} p-5 rounded-xl border shadow-lg`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{zone.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{zone.area}</p>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color}`}>
                  {cfg.icon} {zone.status}
                </span>
              </div>
              {/* Load bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Grid Load</span>
                  <span className={cfg.color}>{zone.load}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${zone.load}%`, backgroundColor: cfg.bar.replace('#', '#') }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1.5">Last updated: {zone.lastUpdated}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div className={`${card} p-6 rounded-xl border shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">Zone-wise Grid Load (%)</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2A3441' : '#E5E7EB'} vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: darkMode ? '#1A2235' : '#fff', borderColor: darkMode ? '#2A3441' : '#E5E7EB', color: darkMode ? '#fff' : '#111' }}
              />
              <Bar dataKey="load" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={statusConfig[entry.status].bar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ElectricityMonitor;
