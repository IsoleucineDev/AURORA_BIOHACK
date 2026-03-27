import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import type { SensorReading } from '../utils/mockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoryChartProps {
  data: SensorReading[];
}

/**
 * Line chart showing volume history for the last hour
 * Frutiger Aero Design with glossy effects
 * Updates in real-time as new data arrives
 */
export const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}>
        <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Historial de Volumen (Última Hora)
        </h3>
        <div className="h-64 sm:h-80 flex items-center justify-center text-blue-400/60">
          Recopilando datos del historial...
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: data.map(reading => format(reading.timestamp, 'HH:mm')),
    datasets: [
      {
        label: 'Volumen (ml)',
        data: data.map(reading => reading.estimated_volume),
        fill: true,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.15)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 8,
        pointBackgroundColor: '#2196F3',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        borderWidth: 3,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(33, 150, 243, 0.95)',
        padding: 12,
        displayColors: false,
        cornerRadius: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        callbacks: {
          title: (context) => {
            return `Hora: ${context[0].label}`;
          },
          label: (context) => {
            return `Volumen: ${Math.round(context.parsed.y)} ml`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0,
          autoSkipPadding: 20,
          color: '#64B5F6',
          font: {
            size: 11,
            weight: '500'
          }
        }
      },
      y: {
        min: 0,
        max: 500,
        grid: {
          color: 'rgba(33, 150, 243, 0.08)'
        },
        ticks: {
          callback: (value) => `${value} ml`,
          color: '#64B5F6',
          font: {
            size: 11,
            weight: '500'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Calculate stats
  const latestVolume = data[data.length - 1]?.estimated_volume || 0;
  const firstVolume = data[0]?.estimated_volume || 0;
  const volumeChange = latestVolume - firstVolume;
  const avgVolume = data.reduce((sum, r) => sum + r.estimated_volume, 0) / data.length;

  return (
    <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
      background: 'rgba(255, 255, 255, 0.85)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
    }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Historial de Volumen (Última Hora)
          </h3>
        </div>
        <div className="text-xs sm:text-sm text-blue-600/70 font-medium">
          {data.length} lecturas
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-80 mb-4 sm:mb-6 rounded-xl overflow-hidden" style={{
        background: 'rgba(224, 247, 250, 0.3)',
        padding: '12px'
      }}>
        <Line data={chartData} options={options} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t" style={{
        borderColor: 'rgba(33, 150, 243, 0.2)'
      }}>
        <div className="p-3 rounded-xl" style={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(79, 195, 247, 0.1) 100%)',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        }}>
          <div className="text-xs sm:text-sm text-blue-700/70 mb-1 font-medium">Volumen Actual</div>
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {Math.round(latestVolume)} ml
          </div>
        </div>
        <div className="p-3 rounded-xl" style={{
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <div className="text-xs sm:text-sm text-green-700/70 mb-1 font-medium">Promedio (1h)</div>
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {Math.round(avgVolume)} ml
          </div>
        </div>
        <div className="p-3 rounded-xl" style={{
          background: `linear-gradient(135deg, ${volumeChange >= 0 ? 'rgba(249, 115, 22, 0.1)' : 'rgba(76, 175, 80, 0.1)'} 0%, ${volumeChange >= 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'} 100%)`,
          border: `1px solid ${volumeChange >= 0 ? 'rgba(249, 115, 22, 0.2)' : 'rgba(76, 175, 80, 0.2)'}`
        }}>
          <div className={`text-xs sm:text-sm mb-1 font-medium ${volumeChange >= 0 ? 'text-orange-700/70' : 'text-green-700/70'}`}>
            Cambio (1h)
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${volumeChange >= 0 ? 'bg-gradient-to-br from-orange-600 to-amber-500' : 'bg-gradient-to-br from-green-600 to-emerald-500'} bg-clip-text text-transparent`}>
            {volumeChange >= 0 ? '+' : ''}{Math.round(volumeChange)} ml
          </div>
        </div>
      </div>
    </div>
  );
};