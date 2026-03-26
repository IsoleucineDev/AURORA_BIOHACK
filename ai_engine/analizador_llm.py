import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Instrucción Maestra para los Jueces
SYSTEM_INSTRUCTION = """
Eres AURORA IA. Analiza la correlación entre la Conductancia Cutánea (GSR) y la Frecuencia Cardíaca (HR).
PATRÓN DE CRISIS (DA): 
- GSR sube bruscamente (>20% en 1 min).
- HR baja (Bradicardia <60 BPM) O sube erráticamente.
- HRV disminuye.

RESPUESTA: Genera un diagnóstico técnico rápido y nivel de riesgo (Bajo, Medio, Crítico).
"""

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=SYSTEM_INSTRUCTION
)

def analizar_ventana_tiempo(datos_excel):
    # Simulamos que tomamos una ventana de tus datos de Excel
    # En una crisis, veríamos GSR subiendo y HR bajando
    prompt = f"""
    DATOS DEL SENSOR (Último minuto):
    {datos_excel}
    
    Analiza si hay signos de Disreflexia Autonómica.
    """
    
    response = model.generate_content(prompt)
    return response.text

# --- SIMULACIÓN CON TUS DATOS ---
# Basado en tu archivo "Movimiento_10min.csv", simulamos una alerta
ejemplo_datos = "GSR_Raw: 3946, IR_Raw: 166553 -> Tendencia: GSR aumentando, HR disminuyendo"
print(analizar_ventana_tiempo(ejemplo_datos))
