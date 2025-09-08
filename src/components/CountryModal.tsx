'use client';

import React from 'react';
import { Country } from '@/types';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

interface CountryModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CountryModal({ country, isOpen, onClose }: CountryModalProps) {
  const { favorites, toggleFavorite, addToTrip } = useTripPlanner();
  
  if (!isOpen || !country) return null;
  
  const isFavorite = favorites.some(fav => fav.cca2 === country.cca2);
  
  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };
  
  const formatArea = (area: number) => {
    return `${area.toLocaleString()} km²`;
  };
  
  const getCurrency = () => {
    const currencies = Object.values(country.currencies || {});
    return currencies.length > 0 ? `${currencies[0].name} (${currencies[0].symbol})` : 'N/A';
  };
  
  const getLanguages = () => {
    const languages = Object.values(country.languages || {});
    return languages.length > 0 ? languages.join(', ') : 'N/A';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal-close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="modal-header">
          <div className="flex items-center mb-4">
            <img 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              className="w-16 h-12 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{country.name.common}</h3>
              <p className="text-sm text-gray-600">{country.name.official}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(country)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isFavorite
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            
            <button
              onClick={() => addToTrip(country)}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add to Trip
            </button>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Region</h4>
                <p className="text-sm text-gray-900">{country.region}</p>
                <p className="text-xs text-gray-600">{country.subregion}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Currency</h4>
                <p className="text-sm text-gray-900">{getCurrency()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Capital</h4>
                <p className="text-sm text-gray-900">{country.capital?.[0] || 'N/A'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Languages</h4>
                <p className="text-sm text-gray-900">{getLanguages()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Population</h4>
                <p className="text-sm text-gray-900">{formatPopulation(country.population)}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Timezones</h4>
                <p className="text-sm text-gray-900">{country.timezones[0]}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Area</h4>
                <p className="text-sm text-gray-900">{formatArea(country.area)}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Continents</h4>
                <p className="text-sm text-gray-900">{country.continents.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}