import React, { useState } from 'react';
import { Car } from 'lucide-react';

const Parking = () => {
  const [parkingSpots, setParkingSpots] = useState([
    { id: 'A1', status: 'occupied' },
    { id: 'A2', status: 'available' },
    { id: 'A3', status: 'occupied' },
    { id: 'A4', status: 'available' },
    { id: 'B1', status: 'available' },
    { id: 'B2', status: 'occupied' },
    { id: 'B3', status: 'available' },
    { id: 'B4', status: 'available' },
    { id: 'C1', status: 'occupied' },
    { id: 'C2', status: 'occupied' },
    { id: 'C3', status: 'occupied' },
    { id: 'C4', status: 'available' },
  ]);

  // Click karne par status change karne ka logic
  const toggleSpot = (id) => {
    setParkingSpots(parkingSpots.map(spot => {
      if (spot.id === id) {
        return { ...spot, status: spot.status === 'available' ? 'occupied' : 'available' };
      }
      return spot;
    }));
  };

  const availableCount = parkingSpots.filter(spot => spot.status === 'available').length;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Smart Parking</h1>
        <p className="text-gray-400 mt-1">Click any parking block to toggle status in real-time.</p>
      </header>

      <div className="bg-dark-card p-6 rounded-xl border border-dark-border shadow-lg mb-8 flex justify-between items-center">
         <div>
           <h2 className="text-xl font-bold text-brand-blue">Central Mall Parking Hub</h2>
           <p className="text-gray-400 mt-1">Level 1 - VIP Section</p>
         </div>
         <div className="text-right">
            <p className="text-4xl font-bold text-brand-green">{availableCount} <span className="text-xl text-gray-500">/ {parkingSpots.length}</span></p>
            <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Available Spots</p>
         </div>
      </div>

      <div className="bg-dark-card p-8 rounded-xl border border-dark-border shadow-lg">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {parkingSpots.map((spot) => (
              <div 
                key={spot.id} 
                onClick={() => toggleSpot(spot.id)}
                className={`h-32 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                  spot.status === 'available' 
                    ? 'border-brand-green/30 bg-brand-green/10 text-brand-green hover:bg-brand-green/20' 
                    : 'border-brand-red/30 bg-brand-red/10 text-brand-red hover:bg-brand-red/20'
                }`}
              >
                <Car size={36} className={`mb-3 ${spot.status === 'available' ? 'opacity-20' : 'opacity-100'}`} />
                <span className="font-bold text-xl">{spot.id}</span>
                <span className="text-xs uppercase mt-1 tracking-wider">{spot.status}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Parking;