import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../env';
import image from '../../Constant/image';



const Home = () => {
    const mapRef = useRef();
    const [coordinates, setCoordinates] = useState({
        pickUpCords: {
            latitude: 22.301646,
            longitude: 91.864160,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        },
        dropCords: {
            latitude: 22.358333,
            longitude: 91.838333,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        }
    });

    const { pickUpCords, dropCords } = coordinates;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={pickUpCords}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>
                    <Marker coordinate={pickUpCords} image={image?.homePoint} />
                    <Marker coordinate={dropCords} image={image?.dropPoint} />
                    <MapViewDirections
                        origin={pickUpCords}
                        destination={dropCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeColor='#FF5159'
                        strokeWidth={5}
                        optimizeWaypoints={true}
                        onReady={(res) => {
                            mapRef.current?.fitToCoordinates(res?.coordinates, {
                                edgePadding: {
                                    right: 10,
                                    bottom: 100,
                                    left: 10,
                                    top: 100
                                }
                            })
                        }}
                    />
                </MapView>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Select Location</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
    },
})

export default Home;
