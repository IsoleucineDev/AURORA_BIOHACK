# 🚀 Guía Rápida de Setup - NeuroCare AI

## ✅ Estado Actual

El dashboard está **100% funcional** y listo para usar con datos simulados en tiempo real.

## 🎮 Cómo Usar

### Modo Demo (Actual)

El sistema funciona inmediatamente sin configuración adicional:

1. ✅ Los datos se actualizan cada 5 segundos automáticamente
2. ✅ Todos los componentes están funcionando
3. ✅ Las alertas se activan según los umbrales
4. ✅ Las gráficas muestran históricos simulados

**No necesitas hacer nada más para probar el sistema.**

---

## 🔄 Migración a Firebase (Producción)

Si quieres conectar a una base de datos Firebase real, sigue estos pasos:

### Paso 1: Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com/
2. Haz clic en "Crear un proyecto"
3. Sigue el asistente de configuración
4. Habilita **Firestore Database**

### Paso 2: Obtener Configuración

1. En Firebase Console, ve a Configuración del Proyecto (⚙️)
2. Scroll hasta "Tus aplicaciones"
3. Haz clic en el ícono de Web (</>)
4. Registra tu app
5. Copia el objeto `firebaseConfig`

### Paso 3: Configurar en el Código

**Archivo: `/src/app/firebase/config.ts`**

```typescript
// Descomenta y reemplaza con tus valores:
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Paso 4: Actualizar Hooks

**Archivo: `/src/app/hooks/useSensorData.ts`**

1. Comenta la implementación actual (líneas con mock data)
2. Descomenta el bloque que dice `PRODUCTION FIREBASE IMPLEMENTATION`
3. Ajusta el `userId` según tu lógica de autenticación

**Archivo: `/src/app/hooks/usePredictions.ts`**

1. Repite el mismo proceso
2. Descomenta la versión de Firebase
3. Comenta la versión mock

### Paso 5: Configurar Firestore

**Estructura de colecciones requerida:**

```
Firestore Database
└── sensor_data
    └── {userId}
        └── readings (colección)
            └── {autoId}
                ├── pressure: number
                ├── flow_rate: number
                ├── temperature: number
                ├── activity: object
                ├── estimated_volume: number
                └── timestamp: timestamp

└── predictions
    └── {userId}
        └── entries (colección)
            └── {autoId}
                ├── time_to_full: number
                ├── confidence: number
                ├── timestamp: timestamp
                └── alert_sent: boolean
```

### Paso 6: Reglas de Seguridad

En Firebase Console > Firestore > Reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Sensor data - solo lectura/escritura para usuarios autenticados
    match /sensor_data/{userId}/readings/{readingId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Predictions - solo lectura/escritura para usuarios autenticados
    match /predictions/{userId}/entries/{entryId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🔌 Integración con Hardware

Para conectar sensores físicos a Firebase:

### Opción 1: ESP32/Arduino + WiFi

```cpp
// Pseudocódigo para Arduino/ESP32
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

void loop() {
  // Leer sensores
  float pressure = analogRead(PRESSURE_PIN) * CONVERSION_FACTOR;
  float temperature = readTemperatureSensor();
  
  // Enviar a Firebase
  Firebase.setFloat(fbdo, "/sensor_data/userId/readings/pressure", pressure);
  Firebase.setFloat(fbdo, "/sensor_data/userId/readings/temperature", temperature);
  Firebase.setTimestamp(fbdo, "/sensor_data/userId/readings/timestamp");
  
  delay(5000); // Cada 5 segundos
}
```

### Opción 2: Python + Raspberry Pi

```python
import firebase_admin
from firebase_admin import credentials, firestore
import time

# Inicializar Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

while True:
    # Leer sensores
    sensor_data = {
        'pressure': read_pressure_sensor(),
        'flow_rate': read_flow_sensor(),
        'temperature': read_temperature_sensor(),
        'activity': read_accelerometer(),
        'estimated_volume': calculate_volume(),
        'timestamp': firestore.SERVER_TIMESTAMP
    }
    
    # Escribir a Firestore
    db.collection('sensor_data').document('userId').collection('readings').add(sensor_data)
    
    time.sleep(5)  # Cada 5 segundos
```

### Opción 3: API REST

```bash
# POST a Firebase REST API
curl -X POST \
  'https://firestore.googleapis.com/v1/projects/YOUR_PROJECT/databases/(default)/documents/sensor_data/userId/readings' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "fields": {
      "pressure": {"doubleValue": 2.5},
      "temperature": {"doubleValue": 36.5},
      "estimated_volume": {"doubleValue": 350},
      "timestamp": {"timestampValue": "2026-02-19T10:30:00Z"}
    }
  }'
```

---

## 🧪 Testing

### Verificar Mock Data

```bash
# Abre la consola del navegador
# Deberías ver actualizaciones cada 5 segundos
```

### Verificar Firebase Connection

```javascript
// Agrega esto temporalmente en App.tsx
useEffect(() => {
  console.log('Sensor data:', latestReading);
  console.log('Prediction:', prediction);
}, [latestReading, prediction]);
```

---

## 📊 Monitoreo y Debugging

### Firebase Console

1. Ve a Firestore Database
2. Observa las colecciones `sensor_data` y `predictions`
3. Los documentos deberían aparecer en tiempo real

### Browser DevTools

```javascript
// Network tab: verifica las llamadas a Firebase
// Console: revisa errores de conexión
// React DevTools: inspecciona el estado de los hooks
```

---

## 🎯 Checklist de Producción

- [ ] Firebase configurado correctamente
- [ ] Reglas de seguridad implementadas
- [ ] Autenticación de usuarios configurada
- [ ] Sensores enviando datos correctamente
- [ ] Dashboard recibiendo datos en tiempo real
- [ ] Alertas funcionando
- [ ] Modelo de IA entrenado y desplegado
- [ ] Testing completo en diferentes dispositivos
- [ ] Backup y recuperación configurados
- [ ] Monitoreo de errores implementado

---

## ❓ Problemas Comunes

### "Permission denied" en Firestore

**Solución:** Verifica las reglas de seguridad y que el usuario esté autenticado.

### Datos no se actualizan

**Solución:** 
1. Verifica la conexión a internet
2. Revisa la consola de Firebase
3. Asegúrate de que los sensores estén enviando datos

### Gráficas vacías

**Solución:** 
1. Verifica que haya al menos 1 lectura en Firestore
2. Revisa el formato de los timestamps
3. Checa que los hooks estén retornando datos

---

## 📞 Soporte

Para reportar bugs o solicitar features:

1. Revisa la documentación completa en `README.md`
2. Verifica los comentarios en el código
3. Consulta la estructura de datos en `mockData.ts`

---

**¡Tu dashboard está listo! 🎉**

Actualmente funciona con datos simulados. Cuando necesites datos reales, sigue los pasos de migración a Firebase.
