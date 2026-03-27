import { useState, useEffect } from 'react';
import { mockHistory, generateRealtimeSensorData, type SensorReading } from '../utils/mockData';

/**
 * Custom hook to simulate real-time sensor data from Firebase
 * 
 * In production, this would use:
 * import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
 * 
 * To connect to real Firebase:
 * 1. Replace mock data with actual Firestore queries
 * 2. Listen to sensor_data/{userId}/readings collection
 * 3. Use onSnapshot for real-time updates
 */

interface UseSensorDataReturn {
  data: SensorReading[];
  latestReading: SensorReading | null;
  loading: boolean;
  error: string | null;
}

export const useSensorData = (): UseSensorDataReturn => {
  const [data, setData] = useState<SensorReading[]>(mockHistory);
  const [latestReading, setLatestReading] = useState<SensorReading | null>(
    mockHistory[mockHistory.length - 1]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial loading
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      try {
        const newReading = generateRealtimeSensorData();
        
        setData(prevData => {
          const updatedData = [...prevData, newReading];
          // Keep only last 60 readings (1 hour)
          return updatedData.slice(-60);
        });
        
        setLatestReading(newReading);
      } catch (err) {
        setError('Error fetching sensor data');
        console.error(err);
      }
    }, 5000); // Update every 5 seconds

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(interval);
    };
  }, []);

  return { data, latestReading, loading, error };
};

/* 
PRODUCTION FIREBASE IMPLEMENTATION:

import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export const useSensorData = (userId: string = 'default'): UseSensorDataReturn => {
  const [data, setData] = useState<SensorReading[]>([]);
  const [latestReading, setLatestReading] = useState<SensorReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, `sensor_data/${userId}/readings`),
      orderBy('timestamp', 'desc'),
      limit(60)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const readings: SensorReading[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          readings.push({
            ...data,
            timestamp: data.timestamp.toDate(),
          } as SensorReading);
        });
        
        readings.reverse(); // Oldest to newest for chart
        setData(readings);
        setLatestReading(readings[readings.length - 1] || null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { data, latestReading, loading, error };
};
*/
