import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Clock } from 'lucide-react';

// Custom accident marker — red pulsing dot, no CDN needed
const makeAccidentIcon = (severity) => {
  const color = severity === 'Major' ? '#EF4444' : '#F59E0B';
  const size  = severity === 'Major' ? 20 : 14;
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px ${color}, 0 0 20px ${color}55;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size],
  });
};

const ACCIDENTS = [
  { id: 1, location: 'NH-48, Mahipalpur',              coords: [28.5562, 77.1000], severity: 'Major', time: '08:30 AM', vehicles: 3, injured: 5 },
  { id: 2, location: 'Ring Road, Dhaula Kuan',          coords: [28.5952, 77.1685], severity: 'Minor', time: '09:15 AM', vehicles: 2, injured: 1 },
  { id: 3, location: 'Connaught Place, Inner Circle',   coords: [28.6315, 77.2167], severity: 'Minor', time: '10:45 AM', vehicles: 2, injured: 0 },
  { id: 4, location: 'Laxmi Nagar Metro Gate 1',        coords: [28.6310, 77.2771], severity: 'Major', time: '07:00 AM', vehicles: 4, injured: 8 },
  { id: 5, location: 'Dwarka Sector 10 Crossing',       coords: [28.5733, 77.0511], severity: 'Minor', time: '11:20 AM', vehicles: 2, injured: 2 },
];

const severityConfig = {
  Major: { color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',    circleColor: '#EF4444' },
  Minor: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', circleColor: '#F59E0B' },
};

const AccidentTracker = ({ darkMode }) => {
  const card = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  const totalInjured = ACCIDENTS.reduce((sum, a) => sum + a.injured, 0);
  const majorCount   = ACCIDENTS.filter(a => a.severity === 'Major').length;
  const minorCount   = ACCIDENTS.filter(a => a.severity === 'Minor').length;

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">🚨 Accident Tracker</h1>
        <p className="text-gray-400 mt-1">Today's accident reports across Delhi NCR — real-time monitoring.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Today</p>
          <p className="text-4xl font-bold text-blue-400">{ACCIDENTS.length}</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🔴 Major</p>
          <p className="text-4xl font-bold text-red-400">{majorCount}</p>
        </div>
        <div className={`${card} p-5 rounded-xl border shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🟡 Minor</p>
          <p className="text-4xl font-bold text-yellow-400">{minorCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Map */}
        <div className={`${card} rounded-xl border shadow-lg overflow-hidden relative z-0`} style={{ minHeight: '380px' }}>
          <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100%', width: '100%', minHeight: '380px' }}>
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />

            {ACCIDENTS.map(acc => (
              <React.Fragment key={acc.id}>
                {/* Glow circle around accident spot */}
                <Circle
                  center={acc.coords}
                  radius={600}
                  pathOptions={{
                    color: severityConfig[acc.severity].circleColor,
                    fillColor: severityConfig[acc.severity].circleColor,
                    fillOpacity: 0.15,
                    weight: 2,
                    opacity: 0.7,
                  }}
                />
                {/* Custom dot marker */}
                <Marker position={acc.coords} icon={makeAccidentIcon(acc.severity)}>
                  <Popup>
                    <div style={{ minWidth: '170px' }}>
                      <strong style={{ fontSize: '13px' }}>{acc.location}</strong>
                      <br />
                      <span style={{
                        color: acc.severity === 'Major' ? '#ef4444' : '#f59e0b',
                        fontWeight: 'bold',
                      }}>
                        {acc.severity} Accident
                      </span>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        🕐 {acc.time} &nbsp;|&nbsp; 🚗 {acc.vehicles} vehicles
                      </span>
                      <br />
                      <span style={{ fontSize: '12px', color: '#ef4444' }}>
                        🏥 {acc.injured} injured
                      </span>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        {/* Accident List */}
        <div className={`${card} rounded-xl border shadow-lg overflow-hidden flex flex-col`}>
          <div className={`p-4 border-b ${darkMode ? 'border-[#2A3441]' : 'border-gray-200'}`}>
            <h2 className="font-bold text-lg">Today's Reports</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Total injured: <span className="text-red-400 font-bold">{totalInjured}</span>
            </p>
          </div>

          {/* Legend */}
          <div className="flex gap-3 px-4 pt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
              <span className="text-xs text-red-400 font-bold">Major</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_#f59e0b]" />
              <span className="text-xs text-yellow-400 font-bold">Minor</span>
            </div>
          </div>

          <div className={`divide-y ${darkMode ? 'divide-[#2A3441]' : 'divide-gray-100'} overflow-y-auto flex-1 mt-2`}>
            {ACCIDENTS.map(acc => {
              const cfg = severityConfig[acc.severity];
              return (
                <div key={acc.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm">{acc.location}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ml-2 flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                      {acc.severity}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400 mt-1 flex-wrap">
                    <span className="flex items-center gap-1"><Clock size={12} /> {acc.time}</span>
                    <span>🚗 {acc.vehicles} vehicles</span>
                    <span className="text-red-400">🏥 {acc.injured} injured</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentTracker;
