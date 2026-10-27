import React from 'react';
import { Car, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useParking } from '../context/ParkingContext';

const Parking = ({ darkMode }) => {
  const { user } = useAuth();
  const { parkingSpots, toggleSpot, availableCount } = useParking();

  const isAdmin = user?.role === 'admin';

  const cardBg = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  // Agar Admin login hai toh direct show karega ki Admin nahi dekh sakta (No lock icon, No popup)
  if (isAdmin) {
    return (
      <div>
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Smart Parking</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Delhi.OS Command Center
          </p>
        </header>

        <div className={`${cardBg} p-12 rounded-xl border shadow-lg text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-10`}>
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed max-w-md`}>
            Admin yeh section nahi dekh sakta. Smart Parking sirf Citizens ke liye available hai.
          </p>
          <div className="mt-6 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
            Citizen Only Service
          </div>
        </div>
      </div>
    );
  }

  // Citizen ke liye normal parking view (No lock icons, no popups)
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Smart Parking</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          Click any parking block to toggle status in real-time.
        </p>
      </header>

      {/* Summary card */}
      <div className={`${cardBg} p-6 rounded-xl border shadow-lg mb-8 flex justify-between items-center`}>
         <div>
           <h2 className="text-xl font-bold text-blue-400">Central Mall Parking Hub</h2>
           <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>Level 1 - VIP Section</p>
         </div>
         <div className="text-right">
            <p className="text-4xl font-bold text-green-400">
              {availableCount} <span className="text-xl text-gray-500 font-normal">/ {parkingSpots.length}</span>
            </p>
            <p className="text-gray-400 text-xs uppercase tracking-wider mt-1 font-semibold">Available Spots</p>
         </div>
      </div>

      {/* Parking Grid */}
      <div className={`${cardBg} p-8 rounded-xl border shadow-lg`}>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {parkingSpots.map((spot) => {
              const isAvailable = spot.status === 'available';
              return (
                <div 
                  key={spot.id} 
                  onClick={() => toggleSpot(spot.id, 'citizen')}
                  className={`h-32 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                    isAvailable 
                      ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                      : 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  <Car size={36} className={`mb-3 ${isAvailable ? 'opacity-20' : 'opacity-100'}`} />
                  <span className="font-bold text-xl">{spot.id}</span>
                  <span className="text-xs uppercase mt-1 tracking-wider">{spot.status}</span>
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
};

export default Parking;
