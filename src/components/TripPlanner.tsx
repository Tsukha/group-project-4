'use client';

import React, { useState } from 'react';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { Trip } from '@/types';

export default function TripPlanner() {
  const { 
    currentTrip, 
    savedTrips, 
    isOpen, 
    removeFromTrip, 
    saveTrip, 
    closePlanner 
  } = useTripPlanner();
  
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  const [tripName, setTripName] = useState('');

  if (!isOpen) return null;

  const handleSaveTrip = () => {
    saveTrip(tripName || undefined);
    setTripName('');
  };

  return (
    <div className="trip-planner">
      <div className="trip-planner-header">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Trip Planner</h2>
          <button
            onClick={closePlanner}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-blue-200">
          Drag countries here to add them to your trip
        </p>
      </div>

      <div className="trip-planner-content">
        {!showSavedTrips ? (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Current Trip</h3>
              {currentTrip.length === 0 ? (
                <div className="glass p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-200 mb-2">No countries added yet.</p>
                  <p className="text-xs text-blue-300">Create and save your first trip!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentTrip.map((country, index) => (
                    <div key={country.cca2} className="trip-item">
                      <div className="flex items-center flex-1">
                        <span className="text-sm mr-2 text-blue-200">{index + 1}.</span>
                        <img 
                          src={country.flags.png} 
                          alt={country.name.common}
                          className="trip-item-flag"
                        />
                        <div>
                          <p className="text-sm font-medium">{country.name.common}</p>
                          <p className="text-xs text-blue-200">{country.region}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromTrip(country.cca2)}
                        className="trip-item-remove"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {currentTrip.length > 0 && (
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="Trip name (optional)"
                  className="save-trip-input"
                />
                
                <button
                  onClick={handleSaveTrip}
                  className="save-trip-btn"
                >
                  Save Trip
                </button>
              </div>
            )}

            {savedTrips.length > 0 && (
              <button
                onClick={() => setShowSavedTrips(true)}
                className="saved-trips-btn"
              >
                Saved Trips ({savedTrips.length})
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Saved Trips</h3>
              <button
                onClick={() => setShowSavedTrips(false)}
                className="text-blue-200 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
            
            {savedTrips.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a3 3 0 003 3h6a3 3 0 003-3V3a2 2 0 012 2v6.5a8.5 8.5 0 01-17 0V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-blue-200 text-sm">No saved trips</p>
                <p className="text-blue-300 text-xs mt-1">Create and save your first trip!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass p-3 rounded-lg">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h4 className="font-medium">{trip.name}</h4>
          <p className="text-xs text-blue-200">
            {trip.countries.length} countries • {new Date(trip.createdAt).toLocaleDateString()}
          </p>
        </div>
        <svg 
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-blue-400 border-opacity-30">
          <div className="space-y-2">
            {trip.countries.map((country, index) => (
              <div key={country.cca2} className="flex items-center text-sm">
                <span className="text-blue-300 mr-2">{index + 1}.</span>
                <img 
                  src={country.flags.png} 
                  alt={country.name.common}
                  className="w-4 h-3 object-cover rounded mr-2"
                />
                <span>{country.name.common}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}