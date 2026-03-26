import pandas as pd
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Configuración
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analizar_csv_con_ia(file_path):
    # 1. Leer el CSV que generaste con el ESP32
    # Saltamos las primeras filas de encabezado si es necesario
    df = pd.read_csv(file_path, skiprows=3) 
    
    # 2. Tomar una muestra (ej. los últimos 30 segundos)
    muestra = df.tail(30).to_string(index=False)
    
    # 3. Configurar el Agente AURORA
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    Eres AURORA IA, experta en Disreflexia Autonómica.
    Analiza esta ventana de datos de sensores:
    {muestra}
    
    CRITERIO: Si el GSR (raw) sube drásticamente mientras el IR (raw) muestra 
    poca variabilidad o tendencia a bradicardia, emite una ALERTA CRÍTICA.
    Responde con: Nivel de Riesgo, Análisis y Acción Recomendada.
    """
    
    response = model.generate_content(prompt)
    return response.text

# Prueba con tu archivo de movimiento
print(analizar_csv_con_ia("Datos_GSR_IR_Sensor.xlsx - Movimiento_10min.csv"))
