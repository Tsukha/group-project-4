'use client';

import React from 'react';
import { Country } from '@/types';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

interface CountryCardProps {
  country: Country;
  onOpenModal: (country: Country) => void;
}

export default function CountryCard({ country, onOpenModal }: CountryCardProps) {
  const { favorites, toggleFavorite, addToTrip } = useTripPlanner();
  
  const isFavorite = favorites.some(fav => fav.cca2 === country.cca2);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(country);
  };
  
  const handleAddToTrip = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToTrip(country);
  };

  const formatPopulation = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`;
    }
    return population.toString();
  };

  return (
    <div 
      className="country-card"
      onClick={() => onOpenModal(country)}
    >
      <div className="relative">
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          className="country-flag"
        />
        <div className="country-actions">
          <button
            onClick={handleFavoriteClick}
            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleAddToTrip}
            className="action-btn add-trip-btn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="country-info">
        <h3 className="country-name">{country.name.common}</h3>
        
        <div className="country-details">
          <div className="country-detail-item">
            <svg className="country-detail-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {country.region}
          </div>
          
          <div className="country-detail-item">
            <svg className="country-detail-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {country.capital?.[0] || 'N/A'}
          </div>
          
          <div className="country-detail-item">
            <svg className="country-detail-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {formatPopulation(country.population)} people
          </div>
        </div>
        
        <div className="mt-3">
          <span className="country-tag">
            {country.region}
          </span>
        </div>
      </div>
    </div>
  );
}