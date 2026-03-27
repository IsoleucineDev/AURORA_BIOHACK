import React, { useState, useEffect } from 'react';
import { Activity, Settings, User, Menu, X } from 'lucide-react';
import { Outlet } from 'react-router';
import { AlertBanner } from './AlertBanner';
import { FrutigerBubbles } from './FrutigerBubbles';
import { BottomNav } from './BottomNav';
import { useSensorData } from '../hooks/useSensorData';
import { usePredictions } from '../hooks/usePredictions';

/**
 * Layout Component - Wraps all views with navigation and alerts
 */
export const Layout: React.FC = () => {
  const { latestReading } = useSensorData();
  const { prediction } = usePredictions(latestReading?.estimated_volume);

  const [showAlert, setShowAlert] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    urgency: 'warning' | 'moderate' | 'critical';
    message: string;
  } | null>(null);

  // Monitor for critical alerts
  useEffect(() => {
    if (!prediction) return;

    if (prediction.time_to_full < 15) {
      setAlertConfig({
        urgency: 'critical',
        message: '¡ALERTA CRÍTICA! Cateterismo requerido en menos de 15 minutos'
      });
      setShowAlert(true);
    } else if (prediction.time_to_full < 30) {
      setAlertConfig({
        urgency: 'moderate',
        message: 'Alerta Moderada: Preparar cateterismo en los próximos 30 minutos'
      });
      setShowAlert(true);
    } else if (prediction.time_to_full < 60) {
      setAlertConfig({
        urgency: 'warning',
        message: 'Advertencia: Monitorear de cerca, cateterismo en menos de 1 hora'
      });
      setShowAlert(true);
    }
  }, [prediction]);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 25%, #F0FDFA 50%, #ECFEFF 75%, #F0F9FF 100%)'
    }}>
      {/* Frutiger Aero Bubbles Background */}
      <FrutigerBubbles />

      {/* Alert Banner */}
      {showAlert && alertConfig && (
        <AlertBanner
          urgency={alertConfig.urgency}
          message={alertConfig.message}
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* Navbar */}
      <nav className="relative z-10 backdrop-blur-md border-b" style={{
        background: 'rgba(255, 255, 255, 0.75)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(33, 150, 243, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
                  boxShadow: '0 4px 15px rgba(33, 150, 243, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  NeuroCare AI
                </h1>
                <p className="text-xs text-blue-700/70 hidden sm:block">Sistema de Monitoreo Vesical</p>
              </div>
            </div>

            {/* Desktop controls */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                className="p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
                }}
                aria-label="Configuración"
              >
                <Settings className="w-5 h-5 text-blue-600" />
              </button>
              <button
                className="p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
                }}
                aria-label="Perfil de usuario"
              >
                <User className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-blue-600" />
              ) : (
                <Menu className="w-5 h-5 text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-2 flex gap-3">
              <button
                className="flex-1 p-3 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
                }}
                aria-label="Configuración"
              >
                <Settings className="w-5 h-5 text-blue-600 mx-auto" />
                <span className="text-xs text-blue-700 mt-1 block">Config</span>
              </button>
              <button
                className="flex-1 p-3 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
                }}
                aria-label="Perfil"
              >
                <User className="w-5 h-5 text-blue-600 mx-auto" />
                <span className="text-xs text-blue-700 mt-1 block">Perfil</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content with Router Outlet */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
