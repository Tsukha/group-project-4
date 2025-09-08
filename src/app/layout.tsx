import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { TripPlannerProvider } from '@/contexts/TripPlannerContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'TravelPlanner - Plan Your Perfect Adventure',
  description: 'Discover amazing destinations, create personalized travel itineraries, and save your favorite places.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TripPlannerProvider>
          <Header />
          <main>{children}</main>
        </TripPlannerProvider>
      </body>
    </html>
  );
}