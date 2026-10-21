import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom colored dot marker — CDN pe depend nahi karta
const makeIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width: 16px; height: 16px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 8px ${color};
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });

const TRAFFIC_POINTS = [
  { name: 'Connaught Place',        coords: [28.6315, 77.2167], status: 'Moderate', color: '#F59E0B', desc: 'Rush hour traffic — expect 15 min delay.'    },
  { name: 'Airport Road (NH-48)',   coords: [28.5562, 77.1000], status: 'Heavy',    color: '#EF4444', desc: 'Heavy congestion — 40+ min delay expected.'   },
  { name: 'Laxmi Nagar',            coords: [28.6310, 77.2771], status: 'Heavy',    color: '#EF4444', desc: 'Peak hour jam near Metro Gate.'               },
  { name: 'Karol Bagh',             coords: [28.6517, 77.1909], status: 'Moderate', color: '#F59E0B', desc: 'Moderate traffic near market area.'            },
  { name: 'Rohini Sector 3',        coords: [28.7350, 77.1100], status: 'Normal',   color: '#22C55E', desc: 'Traffic flowing smoothly.'                     },
  { name: 'Dwarka Sector 10',       coords: [28.5733, 77.0511], status: 'Normal',   color: '#22C55E', desc: 'Clear roads, no congestion.'                  },
  { name: 'Saket',                  coords: [28.5244, 77.2066], status: 'Moderate', color: '#F59E0B', desc: 'Mall traffic — moderate congestion.'           },
  { name: 'Chandni Chowk',          coords: [28.6508, 77.2311], status: 'Heavy',    color: '#EF4444', desc: 'Market area — very heavy traffic.'            },
  { name: 'Janakpuri West',         coords: [28.6265, 77.0809], status: 'Normal',   color: '#22C55E', desc: 'Smooth traffic flow.'                          },
  { name: 'Noida Sector 18',        coords: [28.5706, 77.3219], status: 'Heavy',    color: '#EF4444', desc: 'DND flyway congested — heavy delay.'           },
  { name: 'Pitampura',              coords: [28.7041, 77.1490], status: 'Moderate', color: '#F59E0B', desc: 'Moderate traffic near TV Tower Chowk.'         },
  { name: 'Dhaula Kuan',            coords: [28.5952, 77.1685], status: 'Heavy',    color: '#EF4444', desc: 'Heavy traffic — multiple routes merging here.' },
];

const statusCircleColor = {
  Heavy:    'rgba(239,68,68,0.15)',
  Moderate: 'rgba(245,158,11,0.12)',
  Normal:   'rgba(34,197,94,0.10)',
};

const Traffic = () => {
  const center = [28.6139, 77.2090];

  const heavy    = TRAFFIC_POINTS.filter(p => p.status === 'Heavy').length;
  const moderate = TRAFFIC_POINTS.filter(p => p.status === 'Moderate').length;
  const normal   = TRAFFIC_POINTS.filter(p => p.status === 'Normal').length;

  return (
    <div className="h-full flex flex-col">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Live Traffic Monitor</h1>
        <p className="text-gray-400 mt-1">Real-time traffic status across Delhi NCR.</p>
      </header>

      {/* Legend + quick stats */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
          <span className="text-red-400 text-sm font-bold">Heavy ({heavy})</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_#f59e0b]" />
          <span className="text-yellow-400 text-sm font-bold">Moderate ({moderate})</span>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
          <span className="text-green-400 text-sm font-bold">Normal ({normal})</span>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 bg-[#1A2235] rounded-xl border border-[#2A3441] shadow-lg overflow-hidden relative z-0">
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          />

          {TRAFFIC_POINTS.map((point, idx) => (
            <React.Fragment key={idx}>
              {/* Glow circle around each point */}
              <Circle
                center={point.coords}
                radius={800}
                pathOptions={{ color: point.color, fillColor: statusCircleColor[point.status], fillOpacity: 1, weight: 1.5, opacity: 0.6 }}
              />
              {/* Dot marker */}
              <Marker position={point.coords} icon={makeIcon(point.color)}>
                <Popup>
                  <div style={{ minWidth: '160px' }}>
                    <strong style={{ fontSize: '14px' }}>{point.name}</strong>
                    <br />
                    <span style={{ color: point.color, fontWeight: 'bold' }}>{point.status} Traffic</span>
                    <br />
                    <span style={{ fontSize: '12px', color: '#555' }}>{point.desc}</span>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Traffic;
