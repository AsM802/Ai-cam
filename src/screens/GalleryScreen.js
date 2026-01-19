import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 40) / 3;

export default function GalleryScreen({ navigation }) {
    const [media, setMedia] = useState([]);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === 'granted');

            if (status === 'granted') {
                loadMedia();
            }
        })();
    }, []);

    const loadMedia = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                first: 100,
                mediaType: ['photo', 'video'],
                sortBy: ['creationTime'],
            });
            setMedia(assets);
        } catch (error) {
            console.error('Error loading media:', error);
        }
    };

    const deleteMedia = async (assetId) => {
        Alert.alert(
            'Delete Media',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await MediaLibrary.deleteAssetsAsync([assetId]);
                            loadMedia();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete media');
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mediaItem}
            onLongPress={() => deleteMedia(item.id)}
        >
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            {item.mediaType === 'video' && (
                <View style={styles.videoIndicator}>
                    <Ionicons name="play-circle" size={32} color="white" />
                </View>
            )}
            <View style={styles.mediaInfo}>
                <Text style={styles.mediaDate}>
                    {new Date(item.creationTime).toLocaleDateString()}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>No media library permission</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Violations Gallery</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={loadMedia}>
                    <Ionicons name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {media.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="images-outline" size={80} color="#666" />
                    <Text style={styles.emptyText}>No violations captured yet</Text>
                    <Text style={styles.emptySubText}>
                        Start detecting violations from the camera
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={media}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                />
            )}
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
    refreshButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        padding: 10,
    },
    mediaItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    videoIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -16 }, { translateY: -16 }],
    },
    mediaInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
    },
    mediaDate: {
        color: '#fff',
        fontSize: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        marginTop: 20,
    },
    emptySubText: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
});
