import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
    const [autoCapture, setAutoCapture] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [highQuality, setHighQuality] = useState(false);
    const [gpsEnabled, setGpsEnabled] = useState(true);

    const SettingItem = ({ icon, title, subtitle, value, onValueChange }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon} size={24} color="#4CAF50" />
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#3e3e3e', true: '#4CAF50' }}
                thumbColor={value ? '#fff' : '#f4f3f4'}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detection Settings</Text>

                    <SettingItem
                        icon="camera"
                        title="Auto Capture"
                        subtitle="Automatically capture when violation detected"
                        value={autoCapture}
                        onValueChange={setAutoCapture}
                    />

                    <SettingItem
                        icon="volume-high"
                        title="Sound Alerts"
                        subtitle="Play sound when violation detected"
                        value={soundEnabled}
                        onValueChange={setSoundEnabled}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Media Settings</Text>

                    <SettingItem
                        icon="image"
                        title="High Quality"
                        subtitle="Capture in highest quality (uses more storage)"
                        value={highQuality}
                        onValueChange={setHighQuality}
                    />

                    <SettingItem
                        icon="location"
                        title="GPS Tagging"
                        subtitle="Add location data to captures"
                        value={gpsEnabled}
                        onValueChange={setGpsEnabled}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Version</Text>
                        <Text style={styles.infoValue}>1.0.0 (Prototype)</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Detection Model</Text>
                        <Text style={styles.infoValue}>YOLOv8n (Simulated)</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Platform</Text>
                        <Text style={styles.infoValue}>React Native + Expo</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.dangerButton}>
                    <Ionicons name="trash" size={20} color="#ff4444" />
                    <Text style={styles.dangerButtonText}>Clear All Data</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#000',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: 15,
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#999',
        marginTop: 3,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 15,
        color: '#999',
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        padding: 15,
        borderRadius: 12,
        margin: 20,
        borderWidth: 1,
        borderColor: '#ff4444',
    },
    dangerButtonText: {
        color: '#ff4444',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
});
