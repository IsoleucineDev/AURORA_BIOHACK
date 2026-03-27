/**
 * Mock data for NeuroCare AI Dashboard
 * This simulates real-time sensor data that would come from Firebase
 * Replace this with real Firebase data in production
 */

export interface SensorReading {
  pressure: number;           // kPa
  flow_rate: number;          // L/min
  temperature: number;        // °C
  activity: {
    level: number;            // 0=reposo, 1=movimiento, 2=activo
    accel_x: number;
    accel_y: number;
    accel_z: number;
  };
  estimated_volume: number;   // ml
  timestamp: Date;
}

export interface Prediction {
  time_to_full: number;       // minutos
  confidence: number;         // 0-1
  timestamp: Date;
  alert_sent: boolean;
}

export const mockSensorData: SensorReading = {
  pressure: 2.5,
  flow_rate: 0.08,
  temperature: 36.5,
  activity: {
    level: 1,
    accel_x: 0.1,
    accel_y: 0.2,
    accel_z: 9.8
  },
  estimated_volume: 350,
  timestamp: new Date()
};

export const mockPrediction: Prediction = {
  time_to_full: 45,
  confidence: 0.87,
  timestamp: new Date(),
  alert_sent: false
};

// Generate 60 data points for the last hour
export const mockHistory: SensorReading[] = Array.from({ length: 60 }, (_, i) => ({
  pressure: 1.8 + (i * 0.015) + Math.random() * 0.2,
  flow_rate: 0.05 + Math.random() * 0.05,
  temperature: 36.3 + Math.random() * 0.4,
  activity: {
    level: Math.floor(Math.random() * 3),
    accel_x: Math.random() * 0.2 - 0.1,
    accel_y: Math.random() * 0.2 - 0.1,
    accel_z: 9.7 + Math.random() * 0.2
  },
  estimated_volume: 150 + (i * 3) + Math.random() * 20,
  timestamp: new Date(Date.now() - (60 - i) * 60000)
}));

// Simulate real-time updates
export const generateRealtimeSensorData = (): SensorReading => {
  const lastValue = mockHistory[mockHistory.length - 1]?.estimated_volume || 150;
  const newVolume = Math.min(500, lastValue + Math.random() * 5);
  
  return {
    pressure: 1.5 + (newVolume / 500) * 2 + Math.random() * 0.3,
    flow_rate: 0.05 + Math.random() * 0.08,
    temperature: 36.3 + Math.random() * 0.4,
    activity: {
      level: Math.floor(Math.random() * 3),
      accel_x: Math.random() * 0.2 - 0.1,
      accel_y: Math.random() * 0.2 - 0.1,
      accel_z: 9.7 + Math.random() * 0.2
    },
    estimated_volume: newVolume,
    timestamp: new Date()
  };
};

export const generateRealtimePrediction = (currentVolume: number): Prediction => {
  const remainingVolume = 500 - currentVolume;
  const avgFillRate = 5; // ml/min
  const timeToFull = Math.max(5, Math.round(remainingVolume / avgFillRate));
  
  return {
    time_to_full: timeToFull,
    confidence: 0.80 + Math.random() * 0.15,
    timestamp: new Date(),
    alert_sent: false
  };
};
