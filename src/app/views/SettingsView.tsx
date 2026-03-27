import React from 'react';
import { Settings, User, Bell, Shield, Database, Info } from 'lucide-react';

/**
 * Settings View - App configuration and info
 */
export const SettingsView: React.FC = () => {
  const settingsSections = [
    {
      title: 'Perfil de Usuario',
      icon: User,
      items: [
        { label: 'Nombre del Paciente', value: 'Juan Pérez' },
        { label: 'ID del Dispositivo', value: 'NC-2026-001' },
        { label: 'Fecha de Registro', value: '15 Marzo 2026' }
      ]
    },
    {
      title: 'Configuración de Alertas',
      icon: Bell,
      items: [
        { label: 'Notificaciones Push', value: 'Activadas' },
        { label: 'Alerta de Volumen Crítico', value: '80%' },
        { label: 'Tiempo de Alerta Temprana', value: '60 min' }
      ]
    },
    {
      title: 'Datos y Privacidad',
      icon: Shield,
      items: [
        { label: 'Encriptación de Datos', value: 'Activada' },
        { label: 'Backup Automático', value: 'Diario' },
        { label: 'Almacenamiento Cloud', value: 'Firebase' }
      ]
    },
    {
      title: 'Sistema',
      icon: Database,
      items: [
        { label: 'Versión de la App', value: '1.0.0' },
        { label: 'Modelo de IA', value: 'LSTM v2.3' },
        { label: 'Última Actualización', value: 'Hoy' }
      ]
    }
  ];

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
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-xl sm:text-2xl">
              Configuración
            </h2>
            <p className="text-sm text-blue-600/70">Ajustes y preferencias del sistema</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div 
            key={index}
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" 
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-blue-600" />
              <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {section.title}
              </h3>
            </div>

            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(255, 255, 255, 0.5) 100%)',
                    border: '1px solid rgba(33, 150, 243, 0.1)'
                  }}
                >
                  <span className="text-sm text-blue-800/70">{item.label}</span>
                  <span className="text-sm font-medium text-blue-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* App Info */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-lg" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.9) 100%)',
        border: '2px solid rgba(33, 150, 243, 0.3)',
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}>
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl" style={{
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
          }}>
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Acerca de NeuroCare AI
            </h3>
            <p className="text-sm text-blue-800/80 mb-3 leading-relaxed">
              NeuroCare AI es un sistema de monitoreo vesical inteligente diseñado para mejorar 
              la calidad de vida de pacientes con paraplejia. Utiliza sensores avanzados y 
              algoritmos de inteligencia artificial para predecir el momento óptimo de cateterismo.
            </p>
            <div className="text-xs text-blue-600/60">
              © 2026 BioHack CCM • Estudiambres será una app ok?
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button 
          className="p-4 rounded-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          <span className="text-white font-medium">Exportar Datos</span>
        </button>

        <button 
          className="p-4 rounded-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.9) 100%)',
            border: '2px solid rgba(33, 150, 243, 0.3)',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)'
          }}
        >
          <span className="font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Contactar Soporte
          </span>
        </button>
      </div>
    </div>
  );
};
