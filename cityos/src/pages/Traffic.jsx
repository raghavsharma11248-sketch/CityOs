import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet ke default icons ko React mein sahi se dikhane ke liye fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Traffic = () => {
  // Center location (Delhi coordinates)
  const position = [28.6139, 77.2090];

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Live Traffic Monitor</h1>
        <p className="text-gray-400 mt-1">Real-time city GPS and traffic data.</p>
      </header>

      {/* Map Container */}
      <div className="flex-1 bg-dark-card rounded-xl border border-dark-border shadow-lg overflow-hidden relative z-0">
        <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
          {/* CARTO Dark Matter Base Map for that premium CityOS look */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          
          {/* Marker 1: Connaught Place */}
          <Marker position={position}>
            <Popup>
              <div className="text-gray-800">
                <strong>Central Hub</strong><br />Moderate Traffic.
              </div>
            </Popup>
          </Marker>

          {/* Marker 2: Airport Area */}
          <Marker position={[28.5562, 77.1000]}>
            <Popup>
              <div className="text-gray-800">
                <strong>Airport Road</strong><br /><span className="text-red-500 font-bold">Heavy Traffic Detected!</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Traffic;