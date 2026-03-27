import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#7cf9d6',
    secondary: '#6feeb7',
    tertiary: '#7fccb6',
    quaternary: '#74a7b2',
    accent: '#8faff2',
    background: '#0a0e27',
    surface: '#1a1f3a',
    white: '#ffffff',
    transparent: 'rgba(255, 255, 255, 0.1)',
};

interface SensorData {
    gsr_raw: number;
    ir_raw: number;
    conductancia: number;
    timestamp: string;
}

export default function AuroraApp() {
    const [sensorData, setSensorData] = useState<SensorData>({
        gsr_raw: 2160,
        ir_raw: 165093,
        conductancia: 0,
        timestamp: new Date().toISOString(),
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const conductance = 1 / (sensorData.gsr_raw / 1000);
        setSensorData(prev => ({ ...prev, conductancia: conductance, }));
    }, [sensorData.gsr_raw]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData(prev => ({ ...prev,
                gsr_raw: Math.floor(Math.random() * 4000) + 1000,
                ir_raw: Math.floor(Math.random() * 300000) + 100000,
                timestamp: new Date().toISOString(),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSendToCloud = async () => {
        setLoading(true);
        setMessage('Enviando a nube...');
        try {
            const response = await fetch('https://YOUR_SUPABASE_URL/rest/v1/logs_sensores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_ANON_KEY',
                    'apikey': 'YOUR_ANON_KEY',
                },
                body: JSON.stringify({
                    gsr_raw: sensorData.gsr_raw,
                    ir_raw: sensorData.ir_raw,
                    conductancia: sensorData.conductancia,
                    interpretacion_ia: 'Monitoreo activo',
                }),
            });

            if (response.ok) {
                setMessage('✓ Datos enviados correctamente');
            } else {
                setMessage('✗ Error al enviar');
            }
        } catch (error) {
            setMessage('✗ Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const irProgress = (sensorData.ir_raw / 300000) * 100;

    return (
        <View style={[styles.container, { backgroundColor: COLORS.background }]}> 
            <ScrollView contentContainerStyle={styles.content}> 
                <Text style={styles.title}>AURORA</Text> 
                <Text style={styles.subtitle}>Monitoreo de Sensores</Text> 
                <View style={[styles.gaugeContainer, { borderColor: COLORS.primary }]}> 
                    <Svg width={200} height={200} viewBox="0 0 200 200"> 
                        <Defs> 
                            <LinearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%"> 
                                <Stop offset="0%" stopColor={COLORS.primary} /> 
                                <Stop offset="100%" stopColor={COLORS.accent} /> 
                            </LinearGradient> 
                        </Defs> 
                        <Circle cx="100" cy="100" r="90" fill="none" stroke={COLORS.tertiary} strokeWidth="2" opacity="0.3" /> 
                        <Circle cx="100" cy="100" r="80" fill="none" stroke="url(#gaugeGradient)" strokeWidth="8" strokeDasharray={`${(irProgress / 100) * 502.4} 502.4`} strokeLinecap="round" /> 
                        <Text x="100" y="105" textAnchor="middle" fontSize="24" fill={COLORS.primary} fontWeight="bold"> 
                            {Math.round(irProgress)}% 
                        </Text> 
                    </Svg> 
                </View> 
                <View style={styles.sensorCardsContainer}> 
                    <View style={[styles.sensorCard, { borderColor: COLORS.secondary }]}> 
                        <View style={styles.cardHeader}> 
                            <Ionicons name="flash" size={24} color={COLORS.secondary} /> 
                            <Text style={[styles.cardTitle, { color: COLORS.secondary }]}>GSR</Text> 
                        </View> 
                        <Text style={[styles.cardValue, { color: COLORS.primary }]}>{sensorData.gsr_raw}</Text> 
                        <Text style={styles.cardLabel}>Conductancia: {sensorData.conductancia.toFixed(3)} S</Text> 
                    </View> 
                    <View style={[styles.sensorCard, { borderColor: COLORS.quaternary }]}> 
                        <View style={styles.cardHeader}> 
                            <Ionicons name="thermometer" size={24} color={COLORS.quaternary} /> 
                            <Text style={[styles.cardTitle, { color: COLORS.quaternary }]}>IR</Text> 
                        </View> 
                        <Text style={[styles.cardValue, { color: COLORS.primary }]}>{sensorData.ir_raw}</Text> 
                        <Text style={styles.cardLabel}>Infrarrojo Raw</Text> 
                    </View> 
                </View> 
                <TouchableOpacity style={[styles.sendButton, { backgroundColor: COLORS.primary }]} onPress={handleSendToCloud} disabled={loading}> 
                    {loading ? ( 
                        <ActivityIndicator color={COLORS.background} /> 
                    ) : ( 
                        <Text style={[styles.sendButtonText, { color: COLORS.background }]}>ENVIAR A NUBE</Text> 
                    )} 
                </TouchableOpacity> 
                {message && ( 
                    <Text style={[styles.message, { color: message.includes('✓') ? COLORS.secondary : COLORS.accent }]}> 
                        {message} 
                    </Text> 
                )} 
                <Text style={styles.timestamp}>{new Date(sensorData.timestamp).toLocaleTimeString()}</Text> 
            </ScrollView> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    content: { alignItems: 'center', paddingTop: 40, paddingBottom: 40, },
    title: { fontSize: 36, fontWeight: 'bold', color: COLORS.primary, marginBottom: 5, },
    subtitle: { fontSize: 14, color: COLORS.secondary, marginBottom: 30, },
    gaugeContainer: { width: 220, height: 220, borderRadius: 110, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 40, backgroundColor: 'rgba(26, 31, 58, 0.5)', },
    sensorCardsContainer: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, },
    sensorCard: { width: '48%', borderWidth: 2, borderRadius: 16, padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, },
    cardValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, },
    cardLabel: { fontSize: 12, color: COLORS.white, opacity: 0.7, },
    sendButton: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, marginBottom: 20, },
    sendButtonText: { fontSize: 16, fontWeight: 'bold', },
    message: { fontSize: 14, marginBottom: 16, },
    timestamp: { fontSize: 12, color: COLORS.white, opacity: 0.5, },
});