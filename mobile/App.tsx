import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  useEffect(() => {
    // Simular que termina el splash después de 2 segundos
    const timer = setTimeout(() => {
      console.log('Splash terminó, app lista');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AURORA</Text>
        <Text style={styles.subtitle}>GSR/IR Sensor Monitor</Text>
      </View>
      
      <View style={styles.dashboard}>
        <Text style={styles.dashboardTitle}>Volumen Vesical</Text>
        <Text style={styles.value}>332 ml</Text>
        <Text style={styles.percentage}>66% lleno</Text>
        
        <View style={styles.alert}>
          <Text style={styles.alertText}>⚠️ Alerta: Cateterismo en 45 min</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    paddingTop: 40,
  },
  content: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7cf9d6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7cf9d6',
    opacity: 0.8,
  },
  dashboard: {
    flex: 0.7,
    backgroundColor: '#1a2f4a',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  dashboardTitle: {
    fontSize: 18,
    color: '#7cf9d6',
    marginBottom: 15,
    fontWeight: '600',
  },
  value: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ff9500',
    textAlign: 'center',
    marginBottom: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#7cf9d6',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  alert: {
    backgroundColor: '#ff9500',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  alertText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
