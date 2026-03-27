import React from 'react';
import { VolumeGauge } from '../components/VolumeGauge';
import { PredictionCard } from '../components/PredictionCard';
import { SensorCards } from '../components/SensorCards';
import { HistoryChart } from '../components/HistoryChart';
import { Database, Brain } from 'lucide-react';
import { useSensorData } from '../hooks/useSensorData';
import { usePredictions } from '../hooks/usePredictions';

/**
 * Dashboard View - Main screen with real-time monitoring
 */
export const DashboardView: React.FC = () => {
  const { data: historyData, latestReading, loading: sensorLoading } = useSensorData();
  const { prediction, loading: predictionLoading } = usePredictions(
    latestReading?.estimated_volume
  );

  const currentVolume = latestReading?.estimated_volume || 0;
  const isLoading = sensorLoading || predictionLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center p-8 rounded-3xl backdrop-blur-md" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 32px rgba(33, 150, 243, 0.2)'
        }}>
          <div 
            className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: 'rgba(33, 150, 243, 0.2)',
              borderTopColor: '#2196F3'
            }}
          ></div>
          <p className="text-blue-700 font-medium">Cargando datos del sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-24">
      {/* Row 1: Volume Gauge and Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <VolumeGauge currentVolume={currentVolume} maxVolume={500} />
        <PredictionCard prediction={prediction} />
      </div>

      {/* Row 2: Sensor Cards */}
      <SensorCards sensorData={latestReading} />

      {/* Row 3: History Chart */}
      <HistoryChart data={historyData} />

      {/* Row 4: System Stats */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Estadísticas del Sistema
          </h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="text-center p-3 sm:p-4 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(79, 195, 247, 0.1) 100%)',
            border: '1px solid rgba(33, 150, 243, 0.2)'
          }}>
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {historyData.length}
            </div>
            <div className="text-xs sm:text-sm text-blue-700">Lecturas (1h)</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {prediction ? Math.round(prediction.confidence * 100) : 0}%
            </div>
            <div className="text-xs sm:text-sm text-green-700">Precisión IA</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}>
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text text-transparent">
              {latestReading ? latestReading.pressure.toFixed(1) : 0}
            </div>
            <div className="text-xs sm:text-sm text-orange-700">Presión kPa</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-2xl col-span-2 lg:col-span-1" style={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse shadow-lg" style={{
                boxShadow: '0 0 10px rgba(76, 175, 80, 0.6)'
              }}></div>
              <span className="text-lg sm:text-xl font-bold text-green-700">Activo</span>
            </div>
            <div className="text-xs sm:text-sm text-green-700">Estado del Sistema</div>
          </div>
        </div>
      </div>

      {/* AI Model Info */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.9) 100%)',
        border: '2px solid rgba(33, 150, 243, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-2xl shadow-lg" style={{
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
          }}>
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Modelo de Inteligencia Artificial
            </h3>
            <p className="text-sm text-blue-800/80 mb-3 leading-relaxed">
              Nuestro sistema utiliza un modelo de red neuronal LSTM entrenado con datos de múltiples sensores 
              para predecir con precisión el tiempo óptimo de cateterismo, reduciendo el riesgo de 
              sobredistensión vesical y mejorando la calidad de vida del paciente.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                color: '#1976D2'
              }}>
                Red LSTM Multi-Sensor
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                color: '#388E3C'
              }}>
                Precisión &gt;85%
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                color: '#1976D2'
              }}>
                Actualización Continua
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
