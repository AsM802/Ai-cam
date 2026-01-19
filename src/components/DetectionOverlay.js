import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetectionOverlay({ detections }) {
    return (
        <View style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container: {
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
});
