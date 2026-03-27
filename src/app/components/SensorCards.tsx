import React from 'react';
import { Gauge, Droplets, Thermometer, Activity } from 'lucide-react';
import type { SensorReading } from '../utils/mockData';

interface SensorCardsProps {
  sensorData: SensorReading | null;
}

interface SensorCardData {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  color: string;
  bgColor: string;
}

/**
 * Grid of sensor cards showing real-time data
 * Frutiger Aero Design with glossy effects
 * Responsive: 1 col mobile, 2 tablet, 4 desktop
 */
export const SensorCards: React.FC<SensorCardsProps> = ({ sensorData }) => {
  if (!sensorData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl p-4 sm:p-6 backdrop-blur-lg animate-pulse" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)'
          }}>
            <div className="h-20 bg-blue-100/40 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  const getActivityLabel = (level: number): string => {
    switch (level) {
      case 0: return 'Reposo';
      case 1: return 'Movimiento';
      case 2: return 'Activo';
      default: return 'Desconocido';
    }
  };

  const cards: SensorCardData[] = [
    {
      icon: <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'Presión',
      value: sensorData.pressure.toFixed(2),
      unit: 'kPa',
      color: '#2196F3',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'Flujo',
      value: sensorData.flow_rate.toFixed(3),
      unit: 'L/min',
      color: '#4CAF50',
      bgColor: 'bg-green-50'
    },
    {
      icon: <Thermometer className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'Temperatura',
      value: sensorData.temperature.toFixed(1),
      unit: '°C',
      color: '#F97316',
      bgColor: 'bg-orange-50'
    },
    {
      icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'Actividad',
      value: getActivityLabel(sensorData.activity.level),
      unit: '',
      color: '#F59E0B',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl p-4 sm:p-6 backdrop-blur-lg hover:scale-105 transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: `2px solid ${card.color}20`,
            boxShadow: `0 8px 32px ${card.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.8)`
          }}
        >
          {/* Icon circle */}
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{
              background: `linear-gradient(135deg, ${card.color}20 0%, ${card.color}10 100%)`,
              border: `1px solid ${card.color}30`,
              boxShadow: `0 4px 15px ${card.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.5)`
            }}
          >
            <div style={{ color: card.color }}>
              {card.icon}
            </div>
          </div>

          {/* Label */}
          <div className="text-xs sm:text-sm text-blue-700/70 mb-2 font-medium">
            {card.label}
          </div>

          {/* Value */}
          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-bold" style={{ 
              background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}CC 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {card.value}
            </div>
            {card.unit && (
              <div className="text-blue-600/50 font-medium text-sm">
                {card.unit}
              </div>
            )}
          </div>

          {/* Real-time tag */}
          <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{
              boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)'
            }} />
            <span className="text-xs text-blue-500/60 font-medium">Tiempo real</span>
          </div>
        </div>
      ))}
    </div>
  );
};