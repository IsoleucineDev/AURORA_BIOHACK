import React from 'react';

interface VolumeGaugeProps {
  currentVolume: number;
  maxVolume?: number;
}

/**
 * Animated circular gauge showing bladder volume
 * Frutiger Aero Design with glossy effects
 * Color changes based on fill percentage:
 * - Green: 0-40%
 * - Yellow: 40-60%
 * - Orange: 60-80%
 * - Red: 80-100%
 */
export const VolumeGauge: React.FC<VolumeGaugeProps> = ({ 
  currentVolume, 
  maxVolume = 500 
}) => {
  const percentage = Math.min((currentVolume / maxVolume) * 100, 100);
  
  // Determine color based on percentage
  const getColor = (): string => {
    if (percentage >= 80) return '#EF4444'; // Red
    if (percentage >= 60) return '#F97316'; // Orange
    if (percentage >= 40) return '#F59E0B'; // Yellow
    return '#4CAF50'; // Green (Frutiger Aero green)
  };

  const getGradient = (): string => {
    if (percentage >= 80) return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    if (percentage >= 60) return 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)';
    if (percentage >= 40) return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
    return 'linear-gradient(135deg, #4CAF50 0%, #10B981 100%)';
  };

  const color = getColor();
  const gradient = getGradient();
  
  // SVG circle calculations
  const size = 240;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
      background: 'rgba(255, 255, 255, 0.85)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
    }}>
      <h3 className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Volumen Vesical
      </h3>
      
      <div className="flex flex-col items-center">
        {/* Circular Gauge */}
        <div className="relative" style={{ width: size, height: size }}>
          {/* Glossy outer ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 100%)',
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.5)'
            }}
          />
          
          <svg width={size} height={size} className="transform -rotate-90 relative z-10">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(224, 247, 250, 0.8)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress circle with gradient */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.7 }} />
              </linearGradient>
              <filter id="gaugeShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4"/>
              </filter>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              filter="url(#gaugeShadow)"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Center text with glossy background */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center m-8 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.9), rgba(240, 249, 255, 0.8))',
              boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.6), 0 4px 15px rgba(33, 150, 243, 0.1)'
            }}
          >
            <div className="text-4xl sm:text-5xl font-bold" style={{ 
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {Math.round(currentVolume)}
            </div>
            <div className="text-blue-600/70 mt-1 font-medium">ml</div>
            <div className="text-sm text-blue-500/60 mt-2 font-medium">
              {percentage.toFixed(0)}% lleno
            </div>
          </div>
        </div>

        {/* Horizontal progress bar */}
        <div className="w-full mt-6">
          <div className="flex justify-between text-xs sm:text-sm text-blue-700/70 mb-2 font-medium">
            <span>0 ml</span>
            <span>{maxVolume} ml</span>
          </div>
          <div className="w-full rounded-full h-3 overflow-hidden" style={{
            background: 'rgba(224, 247, 250, 0.6)',
            boxShadow: 'inset 0 2px 4px rgba(33, 150, 243, 0.1)'
          }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out relative"
              style={{
                width: `${percentage}%`,
                background: gradient,
                boxShadow: `0 0 10px ${color}40`
              }}
            >
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full" style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: `1px solid ${color}30`,
          boxShadow: `0 2px 10px ${color}20`
        }}>
          <div 
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse" 
            style={{ 
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}80`
            }}
          />
          <span className="text-xs sm:text-sm font-medium" style={{ color }}>
            {percentage >= 80 && 'Crítico - Cateterismo urgente'}
            {percentage >= 60 && percentage < 80 && 'Alerta - Preparar cateterismo'}
            {percentage >= 40 && percentage < 60 && 'Advertencia - Monitorear'}
            {percentage < 40 && 'Normal - Sistema estable'}
          </span>
        </div>
      </div>
    </div>
  );
};