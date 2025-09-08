'use client';

import React, { useState, useEffect } from 'react';
import { Country } from '@/types';
import CountryCard from '@/components/CountryCard';
import CountryModal from '@/components/CountryModal';
import TripPlanner from '@/components/TripPlanner';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { favorites } = useTripPlanner();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [countries, searchTerm, selectedContinent, showFavoritesOnly, favorites]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,currencies,languages,timezones,continents');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCountries = () => {
    let filtered = [...countries];

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedContinent !== 'All') {
      filtered = filtered.filter(country =>
        country.continents.includes(selectedContinent)
      );
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(country =>
        favorites.some(fav => fav.cca2 === country.cca2)
      );
    }

    setFilteredCountries(filtered);
  };

  const openModal = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const continents = ['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

  if (loading) {
    return (
      <div className="countries-page flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-600">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="countries-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="search-filters">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="filter-select"
              >
                {continents.map(continent => (
                  <option key={continent} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-medium">Show favorites only</span>
              </label>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredCountries.length} of {countries.length} countries
              {searchTerm && <span> • Drag countries to the trip planner to add them</span>}
            </p>
          </div>
        </div>

        {/* Countries Grid */}
        {filteredCountries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No countries found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="countries-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca2}
                country={country}
                onOpenModal={openModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <CountryModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Trip Planner Sidebar */}
      <TripPlanner />
    </div>
  );
}