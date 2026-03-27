import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * NeuroCare AI Dashboard
 * Real-time bladder monitoring system for paraplegic patients
 * Frutiger Aero Design - Mobile First with Bottom Navigation
 */
export default function App() {
  return <RouterProvider router={router} />;
}
