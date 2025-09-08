'use client';

import React from 'react';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const { openPlanner } = useTripPlanner();
  const router = useRouter();
  const pathname = usePathname();

  const handlePlanTrip = () => {
    if (pathname === '/') {
      router.push('/countries');
      setTimeout(() => openPlanner(), 100);
    } else {
      openPlanner();
    }
  };

  return (
    <header className="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-white">TravelPlanner</h1>
            </div>
          </div>
          
          <button
            onClick={handlePlanTrip}
            className="btn-primary"
          >
            Plan a Trip
          </button>
        </div>
      </div>
    </header>
  );
}
