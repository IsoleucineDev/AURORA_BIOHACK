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
