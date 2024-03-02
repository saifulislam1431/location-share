import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../env';
import image from '../../Constant/image';
import { useNavigation, useRoute } from '@react-navigation/native';



const Home = () => {
    const navigation = useNavigation();
    // const route = useRoute();
    // const { userPickUpCords, userDropCords } = route?.params;
    const mapRef = useRef();
    const [coordinates, setCoordinates] = useState({
        pickUpCords: {
            latitude: 22.301646,
            longitude: 91.864160,
        },
        dropCords: {}
    });

    const { pickUpCords, dropCords } = coordinates;

    const handleNavigate = () => {
        navigation.navigate("ChooseLocation", { getCoords: fetchCoords })
    }

    const fetchCoords = (data) => {
        setCoordinates({
            pickUpCords: {
                latitude: data?.pickCoords?.latitude,
                longitude: data?.pickCoords?.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            },
            dropCords: {
                latitude: data?.dropCoords?.latitude,
                longitude: data?.dropCoords?.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={
                        pickUpCords
                    }
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>
                    <Marker coordinate={pickUpCords} image={image?.homePoint} />
                    {
                        Object.keys(dropCords).length > 0 && <Marker coordinate={dropCords} image={image?.dropPoint} />
                    }
                    {
                        Object.keys(dropCords).length > 0 && <MapViewDirections
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
                    }
                </MapView>
            </View>
            <View>
                <Pressable style={styles.btnContainer} onPress={handleNavigate}>
                    <Image source={{
                        uri: "https://i.ibb.co/HFxLpkq/gps.png"
                    }} style={styles.image} />
                    <Text style={styles.btnText}>Select Location</Text>

                </Pressable>
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
        height: Dimensions.get('window').height * 0.75,
    },
    image: {
        height: 50,
        width: 50
    },
    btnContainer: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#FF5159",
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#FF5159"
    }
})

export default Home;
