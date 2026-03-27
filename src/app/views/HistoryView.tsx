import React from 'react';
import { Calendar, TrendingUp, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useSensorData } from '../hooks/useSensorData';

/**
 * History View - Detailed history and records
 */
export const HistoryView: React.FC = () => {
  const { data: historyData } = useSensorData();

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
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
          }}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-xl sm:text-2xl">
              Historial Completo
            </h2>
            <p className="text-sm text-blue-600/70">Registro de todas las lecturas</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(33, 150, 243, 0.2)',
          boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-700/70">Total Lecturas</span>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {historyData.length}
          </div>
        </div>

        <div className="rounded-2xl p-4 backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(76, 175, 80, 0.2)',
          boxShadow: '0 8px 32px rgba(76, 175, 80, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700/70">Volumen Promedio</span>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {Math.round(historyData.reduce((sum, r) => sum + r.estimated_volume, 0) / historyData.length)} ml
          </div>
        </div>

        <div className="rounded-2xl p-4 backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(249, 115, 22, 0.2)',
          boxShadow: '0 8px 32px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-700/70">Presión Promedio</span>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text text-transparent">
            {(historyData.reduce((sum, r) => sum + r.pressure, 0) / historyData.length).toFixed(1)} kPa
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Registros Recientes
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {historyData.slice().reverse().slice(0, 20).map((reading, index) => (
            <div 
              key={index}
              className="p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-102"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 249, 255, 0.6) 100%)',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                boxShadow: '0 2px 10px rgba(33, 150, 243, 0.1)'
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {format(reading.timestamp, 'HH:mm:ss')}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600/60">
                    {format(reading.timestamp, 'dd/MM/yyyy')}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-xs text-blue-600/70 mb-1">Volumen</div>
                    <div className="text-sm font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {Math.round(reading.estimated_volume)} ml
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-orange-600/70 mb-1">Presión</div>
                    <div className="text-sm font-bold bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      {reading.pressure.toFixed(1)} kPa
                    </div>
                  </div>

                  <div className="text-center hidden sm:block">
                    <div className="text-xs text-green-600/70 mb-1">Temp</div>
                    <div className="text-sm font-bold bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
                      {reading.temperature.toFixed(1)}°C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
