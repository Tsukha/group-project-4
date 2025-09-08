'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient">
        <div className="hero-content">
          <h1 className="hero-title">
            Plan Your Perfect{' '}
            <span className="text-yellow-300">Adventure</span>
          </h1>
          
          <p className="hero-subtitle">
            Discover amazing destinations, create personalized travel itineraries, and save your 
            favorite places. Your next adventure is just a click away.
          </p>
          
          <div className="hero-buttons">
            <button
              onClick={() => router.push('/countries')}
              className="btn-primary"
            >
              Explore Places
            </button>
            
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              }
              title="Discover Countries"
              description="Browse through a comprehensive list of countries with detailed information, flags, and key facts about each destination."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              }
              title="Save Favorites"
              description="Mark countries as favorites and easily access them later. Filter by your favorite destinations to plan future trips."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a3 3 0 003 3h6a3 3 0 003-3V3a2 2 0 012 2v6.5a8.5 8.5 0 01-17 0V5z" clipRule="evenodd" />
                </svg>
              }
              title="Plan Trips"
              description="Create custom travel itineraries by selecting multiple countries. Save your trips and access them anytime for future reference."
            />
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Browse Countries"
              description="Explore our comprehensive list of countries with flags and information"
            />
            
            <StepCard
              number="2"
              title="Add to Favorites"
              description="Mark interesting destinations as favorites for easy access"
            />
            
            <StepCard
              number="3"
              title="Plan Your Trip"
              description="Use our trip planner to create custom itineraries"
            />
            
            <StepCard
              number="4"
              title="Save & Share"
              description="Save your travel plans and access them anytime"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="step-number">
        {number}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}