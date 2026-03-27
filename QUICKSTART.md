# ⚡ Quick Start - NeuroCare AI

## 🎯 ¡Empieza en 30 Segundos!

El dashboard **ya está funcionando** con datos simulados en tiempo real. No necesitas configurar nada.

### ✅ El Sistema Ya Incluye:

- ✅ Todos los paquetes instalados
- ✅ Componentes funcionando
- ✅ Datos simulados que se actualizan cada 5 segundos
- ✅ Gráficas en tiempo real
- ✅ Sistema de alertas activo
- ✅ Responsive design completo

---

## 🚀 Visualizar el Dashboard

El dashboard debería estar visible automáticamente. Verás:

### 1️⃣ Medidor Circular de Volumen (Izquierda Superior)
- Muestra el volumen vesical actual
- Color cambia según el llenado (verde → amarillo → naranja → rojo)
- Se actualiza cada 5 segundos

### 2️⃣ Tarjeta de Predicción IA (Derecha Superior)
- Muestra minutos hasta cateterismo necesario
- Nivel de confianza del modelo
- Recomendación automática
- Se actualiza cada 10 segundos

### 3️⃣ Tarjetas de Sensores (Segunda Fila)
- 4 tarjetas: Presión, Flujo, Temperatura, Actividad
- Datos en tiempo real
- Indicador verde pulsante

### 4️⃣ Gráfica Histórica (Tercera Fila)
- Últimas 60 lecturas (1 hora)
- Área bajo la línea
- Estadísticas calculadas

### 5️⃣ Stats del Sistema (Cuarta Fila)
- Total de lecturas
- Precisión del modelo
- Estado actual

---

## 🎨 Probar Diferentes Estados

### Ver Estado Normal (Verde)
Los datos iniciales empiezan con volumen bajo (~150-200ml). El sistema muestra:
- ✅ Medidor verde
- ✅ Predicción >60 minutos
- ✅ Estado "Normal"

### Ver Alerta Crítica (Rojo)
Espera unos minutos y verás cómo:
- 🟡 El volumen aumenta gradualmente
- 🟠 El color cambia a naranja/rojo
- 🔴 Aparece banner de alerta en la parte superior
- ⚠️ La predicción muestra <15 minutos

### Responsive Design
Cambia el tamaño de la ventana del navegador:
- 📱 **Mobile**: Todo en 1 columna
- 📊 **Tablet**: 2 columnas para sensores
- 🖥️ **Desktop**: Layout completo 4 columnas

---

## 🔄 Cómo Funciona la Simulación

### Datos Simulados
```typescript
// Cada 5 segundos:
- Volumen aumenta ~3-5ml
- Presión aumenta proporcionalmente
- Flujo varía aleatoriamente
- Temperatura se mantiene estable (~36.5°C)
- Actividad cambia entre reposo/movimiento/activo
```

### Predicción IA
```typescript
// Cada 10 segundos:
- Calcula: (500ml - volumen_actual) / tasa_llenado
- Genera nivel de confianza: 80-95%
- Determina urgencia según tiempo restante
```

---

## 🎮 Interacciones Disponibles

### ✅ Cerrar Alertas
Cuando aparece el banner de alerta arriba:
1. Haz clic en la **X** para cerrar
2. La alerta volverá a aparecer si persiste la urgencia

### ✅ Hover en Cards
Pasa el mouse sobre las tarjetas:
- Sombra se expande
- Transición suave

### ✅ Tooltips en Gráfica
Pasa el mouse sobre la gráfica:
- Ver hora exacta
- Ver volumen en ese momento

---

## 📂 Archivos Importantes

```
/README.md          → Documentación completa
/SETUP.md           → Guía de instalación Firebase
/TECHNICAL.md       → Documentación técnica
/FEATURES.md        → Lista de características
/QUICKSTART.md      → Este archivo

/src/app/
  ├── App.tsx                    → Dashboard principal
  ├── components/
  │   ├── VolumeGauge.tsx       → Medidor circular
  │   ├── PredictionCard.tsx    → Tarjeta IA
  │   ├── SensorCards.tsx       → Grid de sensores
  │   ├── HistoryChart.tsx      → Gráfica
  │   └── AlertBanner.tsx       → Alertas
  ├── hooks/
  │   ├── useSensorData.ts      → Hook de sensores
  │   └── usePredictions.ts     → Hook de predicciones
  └── utils/
      └── mockData.ts           → Datos simulados
```

---

## 🔧 Personalización Rápida

### Cambiar Colores
Edita `/src/styles/theme.css`:
```css
:root {
  --primary-blue: #2E75B6;    /* Tu color aquí */
  --accent-green: #10B981;     /* Tu color aquí */
  --accent-red: #EF4444;       /* Tu color aquí */
}
```

### Cambiar Frecuencia de Actualización
Edita `/src/app/hooks/useSensorData.ts`:
```typescript
setInterval(() => {
  // Código de actualización
}, 5000);  // Cambia 5000 a los ms que quieras
```

### Cambiar Umbrales de Alerta
Edita `/src/app/components/PredictionCard.tsx`:
```typescript
const getUrgencyLevel = (timeToFull: number): UrgencyLevel => {
  if (timeToFull < 15) return 'critical';  // Cambia estos números
  if (timeToFull < 30) return 'moderate';
  if (timeToFull < 60) return 'warning';
  return 'normal';
}
```

---

## 🚨 Solución Rápida de Problemas

### No veo datos
1. ✅ Espera 1 segundo (loading inicial)
2. ✅ Revisa la consola del navegador (F12)
3. ✅ Verifica que no haya errores rojos

### Gráfica no aparece
1. ✅ Espera a que carguen los datos
2. ✅ El componente necesita mínimo 1 lectura
3. ✅ Revisa la consola por errores de Chart.js

### Alertas no aparecen
1. ✅ Espera a que el volumen aumente
2. ✅ Las alertas se activan cuando el tiempo predicho es <60 min
3. ✅ Puedes forzar editando el volumen inicial en mockData.ts

---

## 📱 Prueba en Móvil

1. Abre Chrome DevTools (F12)
2. Haz clic en el ícono de móvil (📱)
3. Selecciona "iPhone 12" o "Pixel 5"
4. Observa el layout responsive

---

## 🎓 Próximos Pasos

### Para Usar en Desarrollo
✅ Ya estás listo! El sistema funciona completamente.

### Para Conectar a Firebase Real
📖 Lee `/SETUP.md` - Guía completa paso a paso

### Para Entender el Código
📖 Lee `/TECHNICAL.md` - Arquitectura detallada

### Para Ver Todas las Features
📖 Lee `/FEATURES.md` - Lista completa

---

## 💡 Tips Profesionales

### 1. Usa el Sistema de Colores
```typescript
// Accede a los colores custom en JS
const primaryBlue = 'var(--primary-blue)';
// O en CSS
style={{ color: 'var(--primary-blue)' }}
```

### 2. Hooks Reutilizables
```typescript
// Usa los hooks en otros componentes
import { useSensorData } from './hooks/useSensorData';

const { latestReading } = useSensorData();
console.log(latestReading.pressure);
```

### 3. TypeScript Types
```typescript
// Importa los tipos
import type { SensorReading, Prediction } from './utils/mockData';

const myReading: SensorReading = { ... };
```

---

## 🌟 Características Destacadas

| Feature | Estado | Descripción |
|---------|--------|-------------|
| 🎨 UI Profesional | ✅ Listo | Diseño médico limpio |
| ⚡ Tiempo Real | ✅ Listo | Updates cada 5s |
| 🧠 IA Predictiva | ✅ Listo | LSTM simulado |
| 📊 Gráficas | ✅ Listo | Chart.js interactivo |
| 🚨 Alertas | ✅ Listo | 4 niveles de urgencia |
| 📱 Responsive | ✅ Listo | Mobile-first |
| 🔥 Firebase Ready | ✅ Listo | Solo descomentar |
| 📚 Documentado | ✅ Listo | 4 archivos de docs |

---

## 🎯 Objetivos del Proyecto

- ✅ Reducir emergencias vesicales en pacientes con paraplejia
- ✅ Mejorar calidad de vida
- ✅ Predicción proactiva vs reactiva
- ✅ Monitoreo no invasivo
- ✅ Open source y accesible

---

## 🏆 ¡Listo para Usar!

El dashboard está **100% funcional** ahora mismo. Explora, personaliza y disfruta.

Para cualquier duda, consulta:
- 📖 README.md (documentación completa)
- 🔧 SETUP.md (setup Firebase)
- 💻 TECHNICAL.md (arquitectura)
- ✨ FEATURES.md (características)

---

**Desarrollado con ❤️ para BioHack CCM 2026**

*Sistema de monitoreo vesical inteligente para mejorar vidas*
