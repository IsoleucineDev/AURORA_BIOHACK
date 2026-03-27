import React from 'react';
import { Home, Calendar, Heart, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

/**
 * Bottom Navigation Bar - Frutiger Aero Style
 * Floating navigation with glossy buttons
 */
export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/historial', icon: Calendar, label: 'Historial' },
    { path: '/alertas', icon: Heart, label: 'Alertas' },
    { path: '/ajustes', icon: Settings, label: 'Ajustes' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
      <nav 
        className="rounded-3xl backdrop-blur-xl p-2 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(33, 150, 243, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
      >
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300"
                style={{
                  background: active 
                    ? 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)'
                    : 'transparent',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: active 
                    ? '0 4px 20px rgba(33, 150, 243, 0.5), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
                    : 'none'
                }}
              >
                <Icon 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={{ 
                    color: active ? '#fff' : '#64B5F6',
                    strokeWidth: active ? 2.5 : 2
                  }} 
                />
                <span 
                  className="text-xs font-medium hidden sm:block"
                  style={{ 
                    color: active ? '#fff' : '#64B5F6'
                  }}
                >
                  {item.label}
                </span>
                {active && (
                  <div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                    style={{
                      boxShadow: '0 0 10px rgba(0, 188, 212, 0.8)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
