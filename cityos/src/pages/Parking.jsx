import React from 'react';
import { Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useParking } from '../context/ParkingContext';

const Parking = ({ darkMode }) => {
  const { user } = useAuth();
  const { parkingSpots, toggleSpot, availableCount } = useParking();

  const isCitizen = user?.role === 'citizen';

  const cardBg = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  const handleSpotClick = (id) => {
    // Sirf Citizen click karke spot change kar sakta hai
    // Admin ke liye click karne par kuch nahi hoga (silent, koi popup nahi)
    if (isCitizen) {
      toggleSpot(id, 'citizen');
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Smart Parking</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {isCitizen
            ? 'Click any parking block to toggle status in real-time.'
            : 'Live parking grid monitor (View Only).'}
        </p>
      </header>

      {/* Summary Stats Card (Dono ko dikhega) */}
      <div className={`${cardBg} p-6 rounded-xl border shadow-lg mb-8 flex justify-between items-center`}>
         <div>
           <h2 className="text-xl font-bold text-blue-400">Central Mall Parking Hub</h2>
           <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>
             Level 1 - VIP Section {isCitizen ? '• Interactive' : '• Live Monitor'}
           </p>
         </div>
         <div className="text-right">
            <p className="text-4xl font-bold text-green-400">
              {availableCount} <span className="text-xl text-gray-500 font-normal">/ {parkingSpots.length}</span>
            </p>
            <p className="text-gray-400 text-xs uppercase tracking-wider mt-1 font-semibold">Available Spots</p>
         </div>
      </div>

      {/* Parking Grid (Dono ko dikhega, bina kisi lock icon ya popup ke) */}
      <div className={`${cardBg} p-8 rounded-xl border shadow-lg`}>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {parkingSpots.map((spot) => {
              const isAvailable = spot.status === 'available';
              return (
                <div 
                  key={spot.id} 
                  onClick={() => handleSpotClick(spot.id)}
                  className={`h-32 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                    isCitizen 
                      ? 'cursor-pointer hover:scale-[1.02]' 
                      : 'cursor-default'
                  } ${
                    isAvailable 
                      ? 'border-green-500/30 bg-green-500/10 text-green-400' + (isCitizen ? ' hover:bg-green-500/20' : '') 
                      : 'border-red-500/30 bg-red-500/10 text-red-400' + (isCitizen ? ' hover:bg-red-500/20' : '')
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
