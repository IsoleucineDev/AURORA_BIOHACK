#  AURORA: Detección Preventiva de Disreflexia Autonómica

**AURORA** es una plataforma bio-tecnológica diseñada para pacientes con Lesión Medular (LM). Utiliza Inteligencia Artificial (LSTM + Gemini 1.5 Flash) para predecir crisis cardiovasculares antes de que ocurran.

## Arquitectura del Sistema
- **Hardware:** ESP32 + ADC 24-bit (ADS1248) para señales PPG y GSR de grado médico.
- **AI Engine:** Análisis de correlación inversa GSR/HR mediante LLM.
- **Cloud:** Backend en Supabase con cifrado de grado hospitalario.

##  Estructura del Proyecto
- `/firmware`: Código fuente del wearable.
- `/ai_engine`: Lógica de procesamiento y agentes de IA.
- `/backend`: Integración con la base de datos y API.
- `/mobile_app`: Interfaz de usuario para monitoreo en tiempo real.

## Instalación
1. Clona el repo.
2. Crea tu venv: `source AURORA/bin/activate`
3. Instala: `pip install -r requirements.txt`

---

## IV. Arquitectura y UX de la Aplicación (Especificaciones)

La interfaz se segmenta en dos perfiles mediante un interruptor de perfil:

### 1. Panel del Paciente (Interfaz Intuitiva)
* **Semáforo de Estado:** Indicador visual (Verde/Amarillo/Rojo) basado en IA.
* **Alertas de Acción:** Instrucciones en crisis (ej. "Siéntese erguido").
* **Gráfica Simplificada:** Métrica de "Bienestar" (0-100) combinando HRV y EDA.

### 2. Panel Médico (Información Técnica)
* **Tacograma:** Visualización de intervalos $RR$ para arritmias.
* **Desglose de EDA:** Micro-picos de conductancia (SCR) para el sistema nervioso.
* **Logs de Eventos:** Registro con marcas de tiempo para ajuste de medicación.

