import React, { useState } from 'react';
import { Bus, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

const INITIAL_BUSES = [
  { id: 'DL-001', route: '101', from: 'ISBT Kashmere Gate', to: 'Dwarka Sector 21',  status: 'On Time',  delay: 0,  passengers: 42, driver: 'Ram Singh'    },
  { id: 'DL-002', route: '203', from: 'Nehru Place',        to: 'Connaught Place',   status: 'Delayed',  delay: 12, passengers: 67, driver: 'Suresh Kumar'  },
  { id: 'DL-003', route: '305', from: 'Anand Vihar',        to: 'Gurgaon Cyber Hub', status: 'On Time',  delay: 0,  passengers: 28, driver: 'Mohan Lal'    },
  { id: 'DL-004', route: '422', from: 'Saket',              to: 'Old Delhi Rly Stn', status: 'Cancelled', delay: 0, passengers: 0,  driver: 'N/A'           },
  { id: 'DL-005', route: '510', from: 'Rohini Sector 3',    to: 'Lajpat Nagar',      status: 'Delayed',  delay: 8,  passengers: 55, driver: 'Vijay Sharma'  },
  { id: 'DL-006', route: '611', from: 'Dwarka',             to: 'Noida City Centre', status: 'On Time',  delay: 0,  passengers: 39, driver: 'Anil Yadav'    },
  { id: 'DL-007', route: '702', from: 'Shahdara',           to: 'Uttam Nagar',       status: 'On Time',  delay: 0,  passengers: 21, driver: 'Deepak Gupta'  },
  { id: 'DL-008', route: '815', from: 'Janakpuri',          to: 'Chandni Chowk',     status: 'Delayed',  delay: 20, passengers: 74, driver: 'Prakash Singh' },
];

const statusConfig = {
  'On Time':   { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',  icon: <CheckCircle size={14} />,    label: 'On Time'   },
  'Delayed':   { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: <AlertTriangle size={14} />, label: 'Delayed'   },
  'Cancelled': { color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',       icon: <XCircle size={14} />,       label: 'Cancelled' },
};

const BusControl = ({ darkMode }) => {
  const [buses, setBuses] = useState(INITIAL_BUSES);
  const [filter, setFilter] = useState('All');

  const card = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  const onTimeCount    = buses.filter(b => b.status === 'On Time').length;
  const delayedCount   = buses.filter(b => b.status === 'Delayed').length;
  const cancelledCount = buses.filter(b => b.status === 'Cancelled').length;
  const activePassengers = buses.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + b.passengers, 0);

  const filtered = filter === 'All' ? buses : buses.filter(b => b.status === filter);

  const handleRefresh = () => {
    setBuses(prev => prev.map(b => ({
      ...b,
      passengers: b.status === 'Cancelled' ? 0 : Math.min(80, Math.max(10, b.passengers + Math.floor(Math.random() * 10 - 5))),
    })));
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🚌 Bus Control Center</h1>
          <p className="text-gray-400 mt-1">Live status of all active DTC bus routes across Delhi.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🟢 On Time</p>
          <p className="text-4xl font-bold text-green-400">{onTimeCount}</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🟡 Delayed</p>
          <p className="text-4xl font-bold text-yellow-400">{delayedCount}</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🔴 Cancelled</p>
          <p className="text-4xl font-bold text-red-400">{cancelledCount}</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">👥 Passengers</p>
          <p className="text-4xl font-bold text-blue-400">{activePassengers}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {['All', 'On Time', 'Delayed', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f} {f !== 'All' && `(${buses.filter(b => b.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Bus table */}
      <div className={`${card} rounded-xl border shadow-lg overflow-hidden`}>
        <div className={`grid grid-cols-6 px-6 py-3 border-b ${darkMode ? 'border-[#2A3441]' : 'border-gray-100'} text-xs text-gray-400 uppercase tracking-wider font-bold`}>
          <span>Bus ID</span>
          <span>Route</span>
          <span className="col-span-2">From → To</span>
          <span>Passengers</span>
          <span>Status</span>
        </div>
        <div className={`divide-y ${darkMode ? 'divide-[#2A3441]' : 'divide-gray-100'}`}>
          {filtered.map(bus => {
            const cfg = statusConfig[bus.status];
            return (
              <div
                key={bus.id}
                className={`grid grid-cols-6 px-6 py-4 items-center hover:bg-white/5 transition-colors ${
                  bus.status === 'Cancelled' ? 'opacity-50' : ''
                }`}
              >
                <span className="font-mono text-sm font-bold text-blue-400">{bus.id}</span>
                <span className="font-bold">Route {bus.route}</span>
                <span className="col-span-2 text-sm text-gray-400 truncate">{bus.from} → {bus.to}</span>
                <span className="text-sm">
                  {bus.status === 'Cancelled'
                    ? <span className="text-gray-600">—</span>
                    : <span>{bus.passengers} <span className="text-gray-500">pax</span></span>
                  }
                </span>
                <span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                    {bus.status === 'Delayed' ? `+${bus.delay} min` : cfg.label}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusControl;
