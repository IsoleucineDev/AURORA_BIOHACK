import React from 'react';
import { X, AlertTriangle, AlertCircle } from 'lucide-react';

interface AlertBannerProps {
  urgency: 'warning' | 'moderate' | 'critical';
  message: string;
  onDismiss: () => void;
}

/**
 * Floating alert banner for urgent notifications
 * Frutiger Aero Design with glossy effects
 * Appears at top center with bounce animation
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({ urgency, message, onDismiss }) => {
  const config = {
    warning: {
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.15)',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    moderate: {
      color: '#F97316',
      bg: 'rgba(249, 115, 22, 0.15)',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    critical: {
      color: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      icon: <AlertCircle className="w-5 h-5" />,
    }
  };

  const style = config[urgency];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce px-4 max-w-full">
      <div 
        className="rounded-2xl backdrop-blur-lg shadow-2xl p-3 sm:p-4 min-w-[280px] sm:min-w-[400px] max-w-2xl"
        style={{
          background: `linear-gradient(135deg, ${style.bg}, rgba(255, 255, 255, 0.9))`,
          border: `2px solid ${style.color}60`,
          boxShadow: `0 8px 32px ${style.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.8)`
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-xl flex-shrink-0"
            style={{
              background: `${style.color}20`,
              border: `1px solid ${style.color}40`,
              color: style.color
            }}
          >
            {style.icon}
          </div>
          <div className="flex-1 text-sm sm:text-base font-medium" style={{ color: style.color }}>
            {message}
          </div>
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:scale-110 transition-all duration-300 flex-shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              color: style.color
            }}
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};