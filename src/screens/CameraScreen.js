import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import DetectionOverlay from '../components/DetectionOverlay';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [isRecording, setIsRecording] = useState(false);
    const [detections, setDetections] = useState([]);
    const [isDetectionActive, setIsDetectionActive] = useState(true);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

            setHasPermission(
                cameraStatus === 'granted' &&
                mediaStatus === 'granted' &&
                locationStatus === 'granted'
            );
        })();
    }, []);

    const capturePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    exif: true,
                });

                // Get current location
                const location = await Location.getCurrentPositionAsync({});

                // Save to media library
                const asset = await MediaLibrary.createAssetAsync(photo.uri);

                // TODO: Save metadata to local storage
                const metadata = {
                    uri: photo.uri,
                    timestamp: new Date().toISOString(),
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                    detections: detections,
                };

                console.log('Photo captured with metadata:', metadata);
                Alert.alert('Success', 'Violation captured and saved!');
            } catch (error) {
                console.error('Error capturing photo:', error);
                Alert.alert('Error', 'Failed to capture photo');
            }
        }
    };

    const toggleRecording = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                cameraRef.current.stopRecording();
                setIsRecording(false);
            } else {
                try {
                    setIsRecording(true);
                    const video = await cameraRef.current.recordAsync({
                        quality: Camera.Constants.VideoQuality['720p'],
                    });

                    const location = await Location.getCurrentPositionAsync({});
                    const asset = await MediaLibrary.createAssetAsync(video.uri);

                    console.log('Video saved:', video.uri);
                    Alert.alert('Success', 'Video saved!');
                } catch (error) {
                    console.error('Error recording video:', error);
                    setIsRecording(false);
                }
            }
        }
    };

    // Simulated detection for prototype (will be replaced with actual ML model)
    useEffect(() => {
        if (isDetectionActive) {
            const interval = setInterval(() => {
                // Simulate random detections for demo purposes
                const mockDetections = [];
                if (Math.random() > 0.7) {
                    mockDetections.push({
                        type: 'person',
                        hasHelmet: Math.random() > 0.5,
                        confidence: 0.85 + Math.random() * 0.15,
                        bbox: {
                            x: Math.random() * (width - 200),
                            y: Math.random() * (height - 300),
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
                <Text style={styles.text}>Requesting permissions...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No access to camera, media library, or location</Text>
                <Text style={styles.subText}>Please enable permissions in settings</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <DetectionOverlay detections={detections} />

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
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Gallery')}
                    >
                        <Ionicons name="images" size={32} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.captureButton, isRecording && styles.recordingButton]}
                        onPress={capturePhoto}
                    >
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={toggleRecording}
                    >
                        <Ionicons
                            name={isRecording ? 'stop-circle' : 'videocam'}
                            size={32}
                            color={isRecording ? '#ff4444' : 'white'}
                        />
                    </TouchableOpacity>
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
    recordingButton: {
        borderColor: '#ff4444',
    },
});
