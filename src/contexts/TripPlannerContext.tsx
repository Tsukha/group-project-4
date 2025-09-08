'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Country, Trip, TripPlannerContextType } from '@/types';

interface State {
  currentTrip: Country[];
  savedTrips: Trip[];
  favorites: Country[];
  isOpen: boolean;
  successMessage: string | null;
}

type Action =
  | { type: 'ADD_TO_TRIP'; payload: Country }
  | { type: 'REMOVE_FROM_TRIP'; payload: string }
  | { type: 'SAVE_TRIP'; payload?: string }
  | { type: 'TOGGLE_FAVORITE'; payload: Country }
  | { type: 'OPEN_PLANNER' }
  | { type: 'CLOSE_PLANNER' }
  | { type: 'SHOW_SUCCESS'; payload: string }
  | { type: 'HIDE_SUCCESS' };

const initialState: State = {
  currentTrip: [],
  savedTrips: [],
  favorites: [],
  isOpen: false,
  successMessage: null,
};

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

function tripPlannerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_TRIP':
      if (state.currentTrip.find(c => c.cca2 === action.payload.cca2)) {
        return state;
      }
      return {
        ...state,
        currentTrip: [...state.currentTrip, action.payload],
      };
    
    case 'REMOVE_FROM_TRIP':
      return {
        ...state,
        currentTrip: state.currentTrip.filter(c => c.cca2 !== action.payload),
      };
    
    case 'SAVE_TRIP':
      if (state.currentTrip.length === 0) return state;
      
      const newTrip: Trip = {
        id: Date.now().toString(),
        name: action.payload || `Trip ${state.savedTrips.length + 1}`,
        countries: [...state.currentTrip],
        createdAt: new Date().toISOString(),
      };
      
      return {
        ...state,
        savedTrips: [...state.savedTrips, newTrip],
        currentTrip: [],
        successMessage: 'Trip saved successfully!',
      };
    
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.find(c => c.cca2 === action.payload.cca2);
      const message = isFavorite ? 'Removed from favorites!' : 'Added to favorites!';
      
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(c => c.cca2 !== action.payload.cca2)
          : [...state.favorites, action.payload],
        successMessage: message,
      };
    
    case 'OPEN_PLANNER':
      return { ...state, isOpen: true };
    
    case 'CLOSE_PLANNER':
      return { ...state, isOpen: false };
    
    case 'SHOW_SUCCESS':
      return { ...state, successMessage: action.payload };
    
    case 'HIDE_SUCCESS':
      return { ...state, successMessage: null };
    
    default:
      return state;
  }
}

export function TripPlannerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripPlannerReducer, initialState);

  React.useEffect(() => {
    if (state.successMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_SUCCESS' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.successMessage]);

  const contextValue: TripPlannerContextType = {
    currentTrip: state.currentTrip,
    savedTrips: state.savedTrips,
    favorites: state.favorites,
    isOpen: state.isOpen,
    addToTrip: (country) => dispatch({ type: 'ADD_TO_TRIP', payload: country }),
    removeFromTrip: (countryCode) => dispatch({ type: 'REMOVE_FROM_TRIP', payload: countryCode }),
    saveTrip: (name) => dispatch({ type: 'SAVE_TRIP', payload: name }),
    toggleFavorite: (country) => dispatch({ type: 'TOGGLE_FAVORITE', payload: country }),
    openPlanner: () => dispatch({ type: 'OPEN_PLANNER' }),
    closePlanner: () => dispatch({ type: 'CLOSE_PLANNER' }),
    showSuccess: (message) => dispatch({ type: 'SHOW_SUCCESS', payload: message }),
  };

  return (
    <TripPlannerContext.Provider value={contextValue}>
      {children}
      {state.successMessage && <SuccessMessage message={state.successMessage} />}
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
}

function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {message}
      </div>
    </div>
  );
}