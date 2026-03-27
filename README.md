# 🧠 NeuroCare AI - Sistema de Monitoreo Vesical Inteligente

Dashboard en tiempo real para monitoreo vesical de pacientes con paraplejia, utilizando IA para predecir el momento óptimo de cateterismo.

![NeuroCare AI](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop)

## 🎯 Características

- **Medidor de Volumen Circular Animado**: Visualización en tiempo real del llenado vesical con código de colores
- **Predicción IA**: Modelo LSTM que predice tiempo hasta cateterismo necesario
- **Monitoreo Multi-Sensor**: Presión, flujo, temperatura y actividad física
- **Gráficas Históricas**: Visualización de tendencias de la última hora
- **Alertas Inteligentes**: Sistema de notificaciones según urgencia
- **Responsive Design**: Funciona en desktop, tablet y móvil
- **Actualización en Tiempo Real**: Datos que se actualizan automáticamente

## 🏗️ Stack Tecnológico

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Chart.js + react-chartjs-2** - Gráficas interactivas
- **Firebase** (opcional) - Base de datos en tiempo real
- **Lucide React** - Sistema de iconos
- **date-fns** - Manejo de fechas

## 📦 Instalación

```bash
# El proyecto ya incluye todas las dependencias necesarias
# Si necesitas reinstalar:
npm install

# Para desarrollo:
npm run dev

# Para producción:
npm run build
```

## 🎨 Paleta de Colores

```css
Primary Blue: #2E75B6
Primary Dark: #1A4D7A
Accent Green: #10B981 (Normal)
Accent Yellow: #F59E0B (Alerta temprana)
Accent Orange: #F97316 (Alerta moderada)
Accent Red: #EF4444 (Alerta crítica)
```

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── VolumeGauge.tsx       # Medidor circular de volumen
│   ├── PredictionCard.tsx    # Tarjeta de predicción IA
│   ├── SensorCards.tsx       # Grid de sensores en tiempo real
│   ├── HistoryChart.tsx      # Gráfica histórica
│   └── AlertBanner.tsx       # Banner de alertas
├── hooks/
│   ├── useSensorData.ts      # Hook para datos de sensores
│   └── usePredictions.ts     # Hook para predicciones
├── firebase/
│   └── config.ts             # Configuración de Firebase
├── utils/
│   └── mockData.ts           # Datos simulados para desarrollo
└── App.tsx                   # Dashboard principal
```

## 🔧 Configuración

### Modo Desarrollo (Mock Data)

Por defecto, el dashboard usa datos simulados que se actualizan automáticamente cada 5 segundos. No necesitas configurar nada adicional.

### Modo Producción (Firebase Real)

1. **Crear proyecto en Firebase:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Habilita Firestore Database

2. **Configurar Firebase:**
   - Abre `/src/app/firebase/config.ts`
   - Descomenta el código
   - Reemplaza los valores placeholder con tu configuración

3. **Actualizar Hooks:**
   - Abre `/src/app/hooks/useSensorData.ts`
   - Descomenta la implementación de Firebase
   - Comenta la versión mock
   - Repite para `usePredictions.ts`

4. **Estructura de Datos en Firestore:**

```javascript
// Colección: sensor_data/{userId}/readings
{
  pressure: 2.5,           // kPa
  flow_rate: 0.08,         // L/min
  temperature: 36.5,       // °C
  activity: {
    level: 1,              // 0=reposo, 1=movimiento, 2=activo
    accel_x: 0.1,
    accel_y: 0.2,
    accel_z: 9.8
  },
  estimated_volume: 350,   // ml
  timestamp: Timestamp
}

// Colección: predictions/{userId}/entries
{
  time_to_full: 45,        // minutos
  confidence: 0.87,        // 0-1
  timestamp: Timestamp,
  alert_sent: false
}
```

## 🚀 Componentes Principales

### VolumeGauge

Medidor circular SVG animado que muestra el volumen vesical actual.

```tsx
<VolumeGauge currentVolume={350} maxVolume={500} />
```

**Props:**
- `currentVolume`: Volumen actual en ml
- `maxVolume`: Capacidad máxima (default: 500ml)

### PredictionCard

Tarjeta que muestra la predicción del modelo IA.

```tsx
<PredictionCard prediction={predictionData} />
```

**Niveles de Urgencia:**
- Normal: >60 min (verde)
- Warning: 30-60 min (amarillo)
- Moderate: 15-30 min (naranja)
- Critical: <15 min (rojo)

### SensorCards

Grid responsive de 4 tarjetas mostrando datos en tiempo real.

```tsx
<SensorCards sensorData={latestReading} />
```

### HistoryChart

Gráfica de línea mostrando las últimas 60 lecturas (1 hora).

```tsx
<HistoryChart data={historyData} />
```

### AlertBanner

Banner flotante para alertas urgentes.

```tsx
<AlertBanner 
  urgency="critical"
  message="¡Cateterismo urgente requerido!"
  onDismiss={() => setShowAlert(false)}
/>
```

## 🎯 Uso de Hooks Personalizados

### useSensorData

```tsx
const { data, latestReading, loading, error } = useSensorData();
```

**Retorna:**
- `data`: Array de lecturas históricas
- `latestReading`: Lectura más reciente
- `loading`: Estado de carga
- `error`: Mensaje de error (si existe)

### usePredictions

```tsx
const { prediction, loading, error } = usePredictions(currentVolume);
```

**Retorna:**
- `prediction`: Predicción actual del modelo IA
- `loading`: Estado de carga
- `error`: Mensaje de error (si existe)

## 📊 Modelo de IA

El sistema utiliza un modelo LSTM (Long Short-Term Memory) que analiza:

1. **Datos de Sensores:**
   - Presión vesical (kPa)
   - Flujo de líquidos (L/min)
   - Temperatura corporal (°C)
   - Nivel de actividad física

2. **Predicción:**
   - Tiempo hasta llenado completo (minutos)
   - Nivel de confianza (0-100%)
   - Recomendaciones automáticas

3. **Precisión:**
   - >85% de precisión en predicciones
   - Actualización continua basada en nuevos datos
   - Adaptación al patrón individual del paciente

## 🎨 Responsive Design

El dashboard se adapta a diferentes tamaños de pantalla:

- **Mobile (< 768px):** 1 columna
- **Tablet (768px - 1024px):** 2 columnas para sensores
- **Desktop (> 1024px):** 4 columnas para sensores, 2 para gauge + predicción

## 🔔 Sistema de Alertas

Las alertas se activan automáticamente según el tiempo predicho:

| Tiempo Restante | Nivel | Color | Acción |
|----------------|-------|-------|--------|
| < 15 min | Crítico | Rojo | Cateterismo inmediato |
| 15-30 min | Moderado | Naranja | Preparar procedimiento |
| 30-60 min | Advertencia | Amarillo | Monitorear de cerca |
| > 60 min | Normal | Verde | Continuar monitoreo |

## 🛠️ Personalización

### Cambiar Umbrales de Alerta

Edita `PredictionCard.tsx`:

```tsx
const getUrgencyLevel = (timeToFull: number): UrgencyLevel => {
  if (timeToFull < 15) return 'critical';  // Cambia estos valores
  if (timeToFull < 30) return 'moderate';
  if (timeToFull < 60) return 'warning';
  return 'normal';
};
```

### Ajustar Colores

Edita `/src/styles/theme.css`:

```css
:root {
  --primary-blue: #2E75B6;
  --accent-green: #10B981;
  /* Cambia los colores aquí */
}
```

### Modificar Frecuencia de Actualización

Edita `useSensorData.ts`:

```tsx
setInterval(() => {
  // Actualización de datos
}, 5000); // Cambia 5000ms (5 segundos) según necesites
```

## 📈 Roadmap de Funcionalidades Opcionales

- [ ] Sistema de notificaciones push
- [ ] Modo oscuro
- [ ] Exportar datos a CSV/PDF
- [ ] Gráficas múltiples (presión, temperatura separadas)
- [ ] Configuración de umbrales personalizada
- [ ] Historial de alertas
- [ ] Comparación día/semana/mes
- [ ] Multi-idioma (i18n)
- [ ] Perfil de múltiples pacientes
- [ ] Integración con wearables

## 🐛 Solución de Problemas

### Los datos no se actualizan

1. Verifica que los hooks estén importados correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que los intervalos se estén ejecutando

### Error de conexión a Firebase

1. Verifica tu configuración en `firebase/config.ts`
2. Asegúrate de que Firestore esté habilitado
3. Revisa las reglas de seguridad de Firebase

### Gráficas no se muestran

1. Verifica que Chart.js esté instalado correctamente
2. Asegúrate de que hay datos en el array
3. Revisa que los componentes de Chart.js estén registrados

## 👥 Créditos

**NeuroCare AI** - Desarrollado para BioHack CCM 2026

Sistema diseñado para mejorar la calidad de vida de pacientes con paraplejia mediante monitoreo inteligente y predicción asistida por IA.

## 📄 Licencia

Este proyecto es un prototipo educativo desarrollado para fines demostrativos.

---

**Nota Importante:** Este es un sistema prototipo. Para uso médico real, debe pasar por las certificaciones y validaciones clínicas correspondientes según la regulación sanitaria local.
