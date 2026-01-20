import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CameraScreenSimple() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [detections, setDetections] = useState([]);
    const [isDetectionActive, setIsDetectionActive] = useState(true);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const capturePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                });
                Alert.alert('Success', 'Photo captured! URI: ' + photo.uri.substring(0, 50) + '...');
            } catch (error) {
                console.error('Error capturing photo:', error);
                Alert.alert('Error', 'Failed to capture photo');
            }
        }
    };

    // Simulated detection for prototype
    useEffect(() => {
        if (isDetectionActive) {
            const interval = setInterval(() => {
                const mockDetections = [];
                if (Math.random() > 0.7) {
                    mockDetections.push({
                        type: 'person',
                        hasHelmet: Math.random() > 0.5,
                        confidence: 0.85 + Math.random() * 0.15,
                        bbox: {
                            x: Math.random() * (width - 200),
                            y: Math.random() * (height - 300) + 100,
                            width: 150,
                            height: 200,
                        },
                    });
                }
                setDetections(mockDetections);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isDetectionActive]);

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No access to camera</Text>
                <Text style={styles.subText}>Please enable camera permissions in settings</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                {/* Detection Overlay */}
                <View style={styles.overlayContainer}>
                    {detections.map((detection, index) => {
                        const isViolation = detection.type === 'person' && !detection.hasHelmet;

                        return (
                            <View
                                key={index}
                                style={[
                                    styles.boundingBox,
                                    {
                                        left: detection.bbox.x,
                                        top: detection.bbox.y,
                                        width: detection.bbox.width,
                                        height: detection.bbox.height,
                                        borderColor: isViolation ? '#ff4444' : '#4CAF50',
                                    },
                                ]}
                            >
                                <View style={[
                                    styles.label,
                                    { backgroundColor: isViolation ? '#ff4444' : '#4CAF50' }
                                ]}>
                                    <Text style={styles.labelText}>
                                        {isViolation ? '⚠️ NO HELMET' : '✓ Helmet'}
                                    </Text>
                                    <Text style={styles.confidenceText}>
                                        {(detection.confidence * 100).toFixed(0)}%
                                    </Text>
                                </View>
                            </View>
                        );
                    })}

                    {detections.length > 0 && (
                        <View style={styles.detectionInfo}>
                            <Text style={styles.detectionCount}>
                                Detections: {detections.length}
                            </Text>
                            {detections.some(d => d.type === 'person' && !d.hasHelmet) && (
                                <Text style={styles.violationAlert}>
                                    🚨 VIOLATION DETECTED
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                <View style={styles.topBar}>
                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, isDetectionActive && styles.statusDotActive]} />
                        <Text style={styles.statusText}>
                            {isDetectionActive ? 'Detecting' : 'Paused'}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsDetectionActive(!isDetectionActive)}
                    >
                        <Ionicons
                            name={isDetectionActive ? 'pause' : 'play'}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomBar}>
                    <View style={styles.iconButton} />

                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={capturePhoto}
                    >
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    <View style={styles.iconButton} />
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'none',
    },
    boundingBox: {
        position: 'absolute',
        borderWidth: 3,
        borderRadius: 8,
    },
    label: {
        position: 'absolute',
        top: -30,
        left: 0,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 6,
    },
    confidenceText: {
        color: '#fff',
        fontSize: 11,
        opacity: 0.9,
    },
    detectionInfo: {
        position: 'absolute',
        top: 100,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 12,
        borderRadius: 8,
    },
    detectionCount: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    violationAlert: {
        color: '#ff4444',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#666',
        marginRight: 8,
    },
    statusDotActive: {
        backgroundColor: '#4CAF50',
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
});
