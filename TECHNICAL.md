# 📘 Documentación Técnica - NeuroCare AI

## 🏗️ Arquitectura del Sistema

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│                    (Dashboard Principal)                     │
└───────────────┬─────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌─────────┐ ┌──────────┐ ┌──────────────┐
│ Hooks   │ │Components│ │   Utils      │
│         │ │          │ │              │
│ Sensor  │ │ Volume   │ │  mockData    │
│ Predict │ │ Cards    │ │  Firebase    │
└─────────┘ │ Chart    │ └──────────────┘
            │ Alerts   │
            └──────────┘
```

### Flujo de Datos

```
Sensors/Firebase → Hooks → State → Components → UI
     ↑                                           │
     └───────────── User Actions ────────────────┘
```

---

## 📁 Estructura de Archivos Detallada

```
neurocare-ai/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── VolumeGauge.tsx          # Medidor circular SVG
│   │   │   ├── PredictionCard.tsx       # Tarjeta de predicción IA
│   │   │   ├── SensorCards.tsx          # Grid de sensores
│   │   │   ├── HistoryChart.tsx         # Gráfica Chart.js
│   │   │   └── AlertBanner.tsx          # Sistema de alertas
│   │   ├── hooks/
│   │   │   ├── useSensorData.ts         # Hook de sensores
│   │   │   └── usePredictions.ts        # Hook de predicciones
│   │   ├── firebase/
│   │   │   └── config.ts                # Configuración Firebase
│   │   ├── utils/
│   │   │   └── mockData.ts              # Datos simulados
│   │   └── App.tsx                      # Componente principal
│   └── styles/
│       ├── theme.css                    # Tema y colores custom
│       ├── fonts.css                    # Fuentes
│       ├── tailwind.css                 # Configuración Tailwind
│       └── index.css                    # Entry point CSS
├── README.md                            # Documentación usuario
├── SETUP.md                             # Guía de instalación
└── TECHNICAL.md                         # Este archivo
```

---

## 🎨 Sistema de Diseño

### Colores (CSS Variables)

```css
/* Colores Principales */
--primary-blue: #2E75B6;     /* Brand color, botones principales */
--primary-dark: #1A4D7A;     /* Hover states, énfasis */

/* Colores de Estado */
--accent-green: #10B981;     /* Normal (0-40%) */
--accent-yellow: #F59E0B;    /* Warning (40-60%) */
--accent-orange: #F97316;    /* Moderate (60-80%) */
--accent-red: #EF4444;       /* Critical (80-100%) */

/* Grises */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-700: #374151;
--gray-900: #111827;
```

### Tipografía

```css
Font Family: 'Inter' (Sans-serif)
Base Size: 16px

Headings:
- h1: 2rem (32px) - Medium (500)
- h2: 1.5rem (24px) - Medium (500)
- h3: 1.125rem (18px) - Medium (500)
- h4: 1rem (16px) - Medium (500)

Body:
- Regular: 1rem (16px) - Normal (400)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)
```

### Espaciado

```
Sistema base-4:
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

Gaps de Grid:
- Mobile: 16px (gap-4)
- Tablet: 16px (gap-4)
- Desktop: 24px (gap-6)
```

### Radios de Borde

```css
Rounded SM: 0.375rem (6px)
Rounded MD: 0.5rem (8px)
Rounded LG: 0.75rem (12px)
Rounded XL: 1rem (16px)
Rounded Full: 9999px (círculos)
```

### Sombras

```css
Shadow SM: 0 1px 2px rgba(0,0,0,0.05)
Shadow MD: 0 4px 6px rgba(0,0,0,0.1)
Shadow LG: 0 10px 15px rgba(0,0,0,0.1)
```

---

## 🧩 Componentes Detallados

### VolumeGauge

**Props:**
```typescript
interface VolumeGaugeProps {
  currentVolume: number;    // Volumen actual en ml
  maxVolume?: number;       // Capacidad máxima (default: 500)
}
```

**Lógica de Colores:**
```typescript
const getColor = (percentage: number): string => {
  if (percentage >= 80) return '#EF4444';  // Rojo
  if (percentage >= 60) return '#F97316';  // Naranja
  if (percentage >= 40) return '#F59E0B';  // Amarillo
  return '#10B981';                        // Verde
}
```

**Cálculos SVG:**
```typescript
const circumference = 2 * Math.PI * radius;
const offset = circumference - (percentage / 100) * circumference;
```

**Animaciones:**
- Transición de `stroke-dashoffset`: 500ms ease-out
- Animación de pulso en indicador: continua

---

### PredictionCard

**Props:**
```typescript
interface PredictionCardProps {
  prediction: Prediction | null;
}

interface Prediction {
  time_to_full: number;      // minutos
  confidence: number;        // 0-1
  timestamp: Date;
  alert_sent: boolean;
}
```

**Niveles de Urgencia:**
```typescript
type UrgencyLevel = 'normal' | 'warning' | 'moderate' | 'critical';

const getUrgencyLevel = (timeToFull: number): UrgencyLevel => {
  if (timeToFull < 15) return 'critical';   // < 15 min
  if (timeToFull < 30) return 'moderate';   // 15-30 min
  if (timeToFull < 60) return 'warning';    // 30-60 min
  return 'normal';                          // > 60 min
}
```

**Estados Visuales:**
- Border width: 2px (crítico), 1px (normal)
- Background: tint del color de urgencia al 10%
- Icono: CheckCircle (normal), AlertCircle (warning/critical), AlertTriangle (moderate)

---

### SensorCards

**Props:**
```typescript
interface SensorCardsProps {
  sensorData: SensorReading | null;
}

interface SensorReading {
  pressure: number;           // kPa
  flow_rate: number;          // L/min
  temperature: number;        // °C
  activity: {
    level: number;            // 0=reposo, 1=movimiento, 2=activo
    accel_x: number;
    accel_y: number;
    accel_z: number;
  };
  estimated_volume: number;   // ml
  timestamp: Date;
}
```

**Grid Responsive:**
```css
Mobile (< 768px):   grid-cols-1
Tablet (768-1024):  grid-cols-2
Desktop (> 1024px): grid-cols-4
```

**Iconografía:**
- Presión: Gauge (medidor)
- Flujo: Droplets (gotas)
- Temperatura: Thermometer (termómetro)
- Actividad: Activity (pulso)

---

### HistoryChart

**Props:**
```typescript
interface HistoryChartProps {
  data: SensorReading[];   // Array de lecturas (max 60)
}
```

**Configuración Chart.js:**
```typescript
Chart Options:
- Type: 'line'
- Tension: 0.4 (curvas suaves)
- Fill: true (área bajo la línea)
- Point radius: 2px (normal), 6px (hover)
- Aspect ratio: false (altura fija 320px)
```

**Escalas:**
```typescript
X Axis:
- Labels: formato 'HH:mm' (date-fns)
- Grid: oculto
- Ticks: auto-skip con padding 20px

Y Axis:
- Min: 0 ml
- Max: 500 ml
- Grid: visible, color rgba(0,0,0,0.05)
- Ticks: formato "Xml"
```

**Estadísticas Calculadas:**
1. Volumen actual (última lectura)
2. Promedio de 1 hora
3. Cambio total en 1 hora (delta)

---

### AlertBanner

**Props:**
```typescript
interface AlertBannerProps {
  urgency: 'warning' | 'moderate' | 'critical';
  message: string;
  onDismiss: () => void;
}
```

**Posicionamiento:**
```css
position: fixed;
top: 1rem;
left: 50%;
transform: translateX(-50%);
z-index: 50;
```

**Animación:**
```css
animation: bounce 1s ease-in-out infinite;
```

---

## 🪝 Hooks Personalizados

### useSensorData

**Retorno:**
```typescript
interface UseSensorDataReturn {
  data: SensorReading[];           // Histórico (últimas 60)
  latestReading: SensorReading | null;  // Lectura más reciente
  loading: boolean;                // Estado de carga
  error: string | null;            // Mensaje de error
}
```

**Comportamiento Mock:**
1. Loading inicial: 1 segundo
2. Updates: cada 5 segundos
3. Genera nuevo dato con `generateRealtimeSensorData()`
4. Mantiene solo últimas 60 lecturas

**Comportamiento Firebase (Comentado):**
1. Query a `sensor_data/{userId}/readings`
2. Order by `timestamp desc`
3. Limit 60
4. onSnapshot para tiempo real

---

### usePredictions

**Retorno:**
```typescript
interface UsePredictionsReturn {
  prediction: Prediction | null;   // Predicción actual
  loading: boolean;                // Estado de carga
  error: string | null;            // Mensaje de error
}
```

**Comportamiento Mock:**
1. Loading inicial: 1 segundo
2. Updates: cada 10 segundos
3. Calcula basado en volumen actual
4. Fórmula: `timeToFull = (500 - currentVolume) / avgFillRate`

**Comportamiento Firebase (Comentado):**
1. Query a `predictions/{userId}/entries`
2. Order by `timestamp desc`
3. Limit 1 (solo la más reciente)
4. onSnapshot para tiempo real

---

## 🔧 Utilidades

### mockData.ts

**Funciones Principales:**

```typescript
// Genera lectura simulada en tiempo real
generateRealtimeSensorData(): SensorReading

// Genera predicción basada en volumen actual
generateRealtimePrediction(currentVolume: number): Prediction

// Datos pre-generados
mockSensorData: SensorReading
mockPrediction: Prediction
mockHistory: SensorReading[]  // 60 lecturas
```

**Algoritmo de Simulación:**
```typescript
// Volumen aumenta progresivamente con variación aleatoria
newVolume = lastVolume + random(0-5) ml
newVolume = Math.min(500, newVolume)  // Cap a 500ml

// Presión correlacionada con volumen
pressure = 1.5 + (volume/500) * 2 + random(-0.3, 0.3)

// Flujo aleatorio dentro de rango fisiológico
flow_rate = 0.05 + random(0, 0.08) L/min

// Temperatura corporal normal con variación
temperature = 36.3 + random(0, 0.4) °C
```

---

## 🎯 Lógica de Negocio

### Sistema de Alertas

**Trigger de Alertas:**
```typescript
useEffect(() => {
  if (!prediction) return;
  
  if (prediction.time_to_full < 15) {
    // CRÍTICO - Alerta roja
    showAlert('critical', 'Cateterismo urgente requerido');
  } else if (prediction.time_to_full < 30) {
    // MODERADO - Alerta naranja
    showAlert('moderate', 'Preparar cateterismo');
  } else if (prediction.time_to_full < 60) {
    // WARNING - Alerta amarilla
    showAlert('warning', 'Monitorear de cerca');
  }
}, [prediction]);
```

### Cálculo de Volumen

**Ecuación Simplificada (Mock):**
```
V(t) = V₀ + ∫(flow_rate dt)
```

**En Producción (IA):**
```
Modelo LSTM:
Inputs: [pressure(t), flow(t), temp(t), activity(t), historical_pattern]
Output: estimated_volume(t)
```

### Predicción de Tiempo

**Fórmula Mock:**
```typescript
const remainingVolume = maxVolume - currentVolume;
const avgFillRate = 5; // ml/min (asumido)
const timeToFull = remainingVolume / avgFillRate;
```

**En Producción:**
```
Modelo LSTM Predictivo:
Input: [historical_data_60min, current_sensors, user_profile]
Output: [time_to_full, confidence_score]
```

---

## ⚡ Performance

### Optimizaciones Implementadas

1. **React.memo** (recomendado para producción):
```typescript
export const VolumeGauge = React.memo(({ currentVolume, maxVolume }) => {
  // Component code
});
```

2. **useCallback para funciones:**
```typescript
const handleDismiss = useCallback(() => {
  setShowAlert(false);
}, []);
```

3. **useMemo para cálculos pesados:**
```typescript
const chartData = useMemo(() => ({
  labels: data.map(r => format(r.timestamp, 'HH:mm')),
  datasets: [...]
}), [data]);
```

4. **Lazy loading de Chart.js:**
```typescript
const HistoryChart = lazy(() => import('./components/HistoryChart'));
```

### Métricas Target

```
First Contentful Paint: < 1.5s
Time to Interactive: < 3.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
```

---

## 🔒 Seguridad

### Firebase Rules (Producción)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper: verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función helper: verificar ownership
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Sensor data
    match /sensor_data/{userId}/readings/{readingId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) && 
                      request.resource.data.timestamp is timestamp &&
                      request.resource.data.estimated_volume >= 0 &&
                      request.resource.data.estimated_volume <= 500;
    }
    
    // Predictions
    match /predictions/{userId}/entries/{entryId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) &&
                      request.resource.data.confidence >= 0 &&
                      request.resource.data.confidence <= 1;
    }
  }
}
```

### Validación de Datos

```typescript
// Validar lecturas de sensores
const validateSensorReading = (data: any): boolean => {
  return (
    data.pressure >= 0 && data.pressure <= 10 &&  // kPa
    data.flow_rate >= 0 && data.flow_rate <= 0.5 &&  // L/min
    data.temperature >= 35 && data.temperature <= 40 &&  // °C
    data.estimated_volume >= 0 && data.estimated_volume <= 500  // ml
  );
};
```

---

## 🧪 Testing

### Unit Tests (Recomendado)

```typescript
// VolumeGauge.test.tsx
describe('VolumeGauge', () => {
  it('shows green color for volume < 40%', () => {
    render(<VolumeGauge currentVolume={150} maxVolume={500} />);
    // Assert color is green
  });
  
  it('shows red color for volume >= 80%', () => {
    render(<VolumeGauge currentVolume={420} maxVolume={500} />);
    // Assert color is red
  });
});
```

### Integration Tests

```typescript
// App.test.tsx
describe('Dashboard Integration', () => {
  it('updates volume when sensor data changes', async () => {
    const { getByText } = render(<App />);
    // Wait for initial load
    await waitFor(() => expect(getByText(/ml/)).toBeInTheDocument());
    // Simulate new data
    // Assert UI updates
  });
});
```

---

## 📊 Monitoreo

### Logging Recomendado

```typescript
// Usar servicio como Sentry o LogRocket
import * as Sentry from '@sentry/react';

// Error boundaries
<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</Sentry.ErrorBoundary>

// Custom events
Sentry.captureMessage('Alert triggered', {
  level: 'warning',
  extra: { timeToFull, confidence }
});
```

### Analytics

```typescript
// Google Analytics / Firebase Analytics
analytics.logEvent('prediction_generated', {
  time_to_full: prediction.time_to_full,
  confidence: prediction.confidence,
  urgency_level: urgencyLevel
});
```

---

## 🚀 Deployment

### Build para Producción

```bash
npm run build

# Output en /dist
# Archivos optimizados:
# - JS minificado y tree-shaken
# - CSS purgado (solo clases usadas)
# - Assets optimizados
```

### Variables de Entorno

```bash
# .env.production
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
```

### Hosting Options

1. **Firebase Hosting:**
```bash
firebase deploy --only hosting
```

2. **Vercel:**
```bash
vercel --prod
```

3. **Netlify:**
```bash
netlify deploy --prod
```

---

## 📈 Roadmap Técnico

### v1.1
- [ ] Autenticación de usuarios
- [ ] Multi-idioma (i18n)
- [ ] PWA capabilities
- [ ] Offline support

### v1.2
- [ ] WebSocket para updates más rápidos
- [ ] Compresión de datos históricos
- [ ] Export to PDF/CSV
- [ ] Dark mode

### v2.0
- [ ] Modelo IA mejorado
- [ ] Multi-paciente dashboard
- [ ] Video llamadas con médicos
- [ ] Integración con wearables

---

Esta documentación técnica debe actualizarse con cada cambio significativo en la arquitectura o implementación.
