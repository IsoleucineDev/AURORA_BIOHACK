import React from 'react';
import { Heart, Bell, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { usePredictions } from '../hooks/usePredictions';
import { useSensorData } from '../hooks/useSensorData';

/**
 * Alerts View - Health alerts and notifications
 */
export const AlertsView: React.FC = () => {
  const { latestReading } = useSensorData();
  const { prediction } = usePredictions(latestReading?.estimated_volume);

  const currentVolume = latestReading?.estimated_volume || 0;
  const percentage = Math.min((currentVolume / 500) * 100, 100);

  const alerts = [
    {
      id: 1,
      type: prediction && prediction.time_to_full < 15 ? 'critical' : 
            prediction && prediction.time_to_full < 30 ? 'moderate' :
            prediction && prediction.time_to_full < 60 ? 'warning' : 'normal',
      title: prediction && prediction.time_to_full < 15 ? 'Alerta Crítica' :
             prediction && prediction.time_to_full < 30 ? 'Alerta Moderada' :
             prediction && prediction.time_to_full < 60 ? 'Alerta Temprana' : 'Estado Normal',
      message: prediction && prediction.time_to_full < 15 ? '¡Cateterismo inmediato requerido!' :
               prediction && prediction.time_to_full < 30 ? 'Preparar procedimiento en breve' :
               prediction && prediction.time_to_full < 60 ? 'Monitorear de cerca' : 'Sistema funcionando correctamente',
      time: 'Ahora',
      active: true
    },
    {
      id: 2,
      type: percentage >= 80 ? 'critical' : percentage >= 60 ? 'moderate' : percentage >= 40 ? 'warning' : 'normal',
      title: percentage >= 80 ? 'Volumen Crítico' :
             percentage >= 60 ? 'Volumen Alto' :
             percentage >= 40 ? 'Volumen Moderado' : 'Volumen Normal',
      message: `Nivel de llenado vesical al ${percentage.toFixed(0)}%`,
      time: 'Ahora',
      active: true
    },
    {
      id: 3,
      type: latestReading && latestReading.pressure > 3.5 ? 'warning' : 'normal',
      title: latestReading && latestReading.pressure > 3.5 ? 'Presión Elevada' : 'Presión Normal',
      message: latestReading ? `Presión actual: ${latestReading.pressure.toFixed(2)} kPa` : 'Sin datos',
      time: 'Hace 1 min',
      active: latestReading ? latestReading.pressure > 3.5 : false
    }
  ];

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          color: '#EF4444',
          icon: AlertCircle,
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'rgba(239, 68, 68, 0.3)'
        };
      case 'moderate':
        return {
          color: '#F97316',
          icon: AlertTriangle,
          bg: 'rgba(249, 115, 22, 0.1)',
          border: 'rgba(249, 115, 22, 0.3)'
        };
      case 'warning':
        return {
          color: '#F59E0B',
          icon: Bell,
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.3)'
        };
      default:
        return {
          color: '#4CAF50',
          icon: CheckCircle,
          bg: 'rgba(76, 175, 80, 0.1)',
          border: 'rgba(76, 175, 80, 0.3)'
        };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-24">
      {/* Header */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl" style={{
            background: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
          }}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent text-xl sm:text-2xl">
              Centro de Alertas
            </h2>
            <p className="text-sm text-blue-600/70">Notificaciones y estado de salud</p>
          </div>
        </div>
      </div>

      {/* Active Alerts Count */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(239, 68, 68, 0.2)',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-700/70">Alertas Activas</span>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br from-red-600 to-orange-500 bg-clip-text text-transparent">
            {alerts.filter(a => a.active && a.type !== 'normal').length}
          </div>
        </div>

        <div className="rounded-2xl p-4 backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(76, 175, 80, 0.2)',
          boxShadow: '0 8px 32px rgba(76, 175, 80, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700/70">Estado Normal</span>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {alerts.filter(a => a.type === 'normal').length}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Todas las Alertas
        </h3>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className="p-4 rounded-2xl transition-all duration-300 hover:scale-102"
                style={{
                  background: `linear-gradient(135deg, ${config.bg}, rgba(255, 255, 255, 0.8))`,
                  border: `2px solid ${config.border}`,
                  boxShadow: `0 4px 20px ${config.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.6)`
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{
                      background: `${config.color}20`,
                      border: `1px solid ${config.color}40`
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold" style={{ color: config.color }}>
                        {alert.title}
                      </h4>
                      {alert.active && alert.type !== 'normal' && (
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: config.color,
                            boxShadow: `0 0 10px ${config.color}`
                          }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-blue-800/80 mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-blue-600/60">
                        {alert.time}
                      </div>
                      {alert.active && (
                        <div 
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${config.color}15`,
                            color: config.color
                          }}
                        >
                          Activa
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
