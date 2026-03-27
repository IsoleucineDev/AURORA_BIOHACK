import React from 'react';
import { Brain, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Prediction } from '../utils/mockData';

interface PredictionCardProps {
  prediction: Prediction | null;
}

type UrgencyLevel = 'normal' | 'warning' | 'moderate' | 'critical';

interface UrgencyConfig {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  label: string;
  recommendation: string;
}

/**
 * Prediction card showing AI model output
 * Frutiger Aero Design with glossy effects
 * Changes color and message based on time to catheterization
 */
export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Predicción IA</h3>
        </div>
        <div className="text-center py-8 text-blue-400/60">
          Recopilando datos...
        </div>
      </div>
    );
  }

  const getUrgencyLevel = (timeToFull: number): UrgencyLevel => {
    if (timeToFull < 15) return 'critical';
    if (timeToFull < 30) return 'moderate';
    if (timeToFull < 60) return 'warning';
    return 'normal';
  };

  const urgencyLevel = getUrgencyLevel(prediction.time_to_full);

  const urgencyConfig: Record<UrgencyLevel, UrgencyConfig> = {
    normal: {
      color: '#4CAF50',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
      label: 'Normal',
      recommendation: 'Continuar con monitoreo regular'
    },
    warning: {
      color: '#F59E0B',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />,
      label: 'Alerta Temprana',
      recommendation: 'Preparar equipo de cateterismo'
    },
    moderate: {
      color: '#F97316',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      label: 'Alerta Moderada',
      recommendation: 'Iniciar procedimiento en breve'
    },
    critical: {
      color: '#EF4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
      label: 'Alerta Crítica',
      recommendation: '¡Cateterismo inmediato requerido!'
    }
  };

  const config = urgencyConfig[urgencyLevel];
  const confidencePercentage = Math.round(prediction.confidence * 100);

  const getGradient = (): string => {
    if (urgencyLevel === 'critical') return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    if (urgencyLevel === 'moderate') return 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)';
    if (urgencyLevel === 'warning') return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
    return 'linear-gradient(135deg, #4CAF50 0%, #10B981 100%)';
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg transition-all duration-300" style={{
      background: 'rgba(255, 255, 255, 0.85)',
      border: `2px solid ${config.color}40`,
      boxShadow: `0 8px 32px ${config.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.8)`
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Predicción IA</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{
          background: `${config.color}15`,
          border: `1px solid ${config.color}30`,
          boxShadow: `0 2px 10px ${config.color}15`
        }}>
          {config.icon}
          <span className="font-medium" style={{ color: config.color }}>{config.label}</span>
        </div>
      </div>

      {/* Time to full */}
      <div className="mb-4 sm:mb-6">
        <div className="text-center">
          <div className="text-5xl sm:text-6xl mb-2 font-bold" style={{ 
            background: getGradient(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {prediction.time_to_full}
          </div>
          <div className="text-blue-700/70 font-medium text-sm sm:text-base">minutos hasta cateterismo</div>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-blue-700/70 mb-2 font-medium">
          <span>Confianza del modelo</span>
          <span>{confidencePercentage}%</span>
        </div>
        <div className="w-full rounded-full h-2.5 overflow-hidden" style={{
          background: 'rgba(224, 247, 250, 0.6)',
          boxShadow: 'inset 0 2px 4px rgba(33, 150, 243, 0.1)'
        }}>
          <div
            className="h-full rounded-full transition-all duration-500 relative"
            style={{
              width: `${confidencePercentage}%`,
              background: getGradient(),
              boxShadow: `0 0 10px ${config.color}40`
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

      {/* Recommendation */}
      <div className="p-3 sm:p-4 rounded-2xl" style={{
        background: `${config.color}10`,
        border: `1px solid ${config.color}25`,
        boxShadow: `0 4px 15px ${config.color}10, inset 0 1px 0 rgba(255, 255, 255, 0.5)`
      }}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
          <div>
            <div className="text-xs sm:text-sm mb-1 font-medium" style={{ color: config.color }}>
              Recomendación:
            </div>
            <div className="text-xs sm:text-sm text-blue-800/80">
              {config.recommendation}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-500/60">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{
          boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)'
        }} />
        <span className="font-medium">Actualización en tiempo real</span>
      </div>
    </div>
  );
};