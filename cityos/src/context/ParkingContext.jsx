import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_PARKING_SPOTS = [
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
];

const ParkingContext = createContext(null);

export const ParkingProvider = ({ children }) => {
  const [parkingSpots, setParkingSpots] = useState(() => {
    const saved = localStorage.getItem('cityos_parking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing parking spots from localStorage', e);
      }
    }
    return INITIAL_PARKING_SPOTS;
  });

  useEffect(() => {
    localStorage.setItem('cityos_parking', JSON.stringify(parkingSpots));
  }, [parkingSpots]);

  // Spot toggle function - Citizen ke liye allow karega
  const toggleSpot = (id, userRole) => {
    if (userRole !== 'citizen') {
      return { success: false, message: 'Sirf Citizen parking spot select ya release kar sakte hain. Admin ke liye view-only hai.' };
    }

    setParkingSpots((prevSpots) =>
      prevSpots.map((spot) => {
        if (spot.id === id) {
          return {
            ...spot,
            status: spot.status === 'available' ? 'occupied' : 'available',
          };
        }
        return spot;
      })
    );

    return { success: true };
  };

  const availableCount = parkingSpots.filter((s) => s.status === 'available').length;

  return (
    <ParkingContext.Provider value={{ parkingSpots, toggleSpot, availableCount }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => useContext(ParkingContext);
