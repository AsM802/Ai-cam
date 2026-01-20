import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>🚗 Traffic Violation App</Text>
      <Text style={styles.subtitle}>Prototype Demo</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Camera Detection</Text>
        <Text style={styles.cardText}>
          This app is designed to detect traffic violations using AI:
        </Text>
        <Text style={styles.feature}>• Helmet violation detection</Text>
        <Text style={styles.feature}>• License plate recognition</Text>
        <Text style={styles.feature}>• GPS tagging</Text>
        <Text style={styles.feature}>• Photo/video capture</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚠️ Compatibility Issue</Text>
        <Text style={styles.cardText}>
          Expo Go SDK 54 has compatibility issues with the camera and navigation modules.
        </Text>
        <Text style={styles.cardText} style={{ marginTop: 10 }}>
          To run the full app, you need to build a development client.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>
          Test Button (Pressed {count} times)
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        GitHub: AsM802/Ai-cam
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  feature: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 12,
    color: '#666',
  },
});
