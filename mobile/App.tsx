import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AURORA</Text>
      <Text style={styles.subtitle}>GSR/IR Sensor Monitor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7cf9d6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6feeb7',
  },
});
