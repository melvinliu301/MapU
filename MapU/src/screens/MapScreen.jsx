import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text, Button, Image} from "react-native";
import MapView, {Polyline, Marker} from "react-native-maps";
import LocationInput from "../components/LocationInput";
import { Entypo } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import LOCATION_LIST from "../constants/locationList";
import polyline from '@mapbox/polyline';
import Toast from 'react-native-toast-message';
import API_KEY from "../constants/apiKey"; 
// import { indoorMap } from "../components/indoorMap";         // indoor map component not integrated since SDK patch not available


const MapScreen = ({ navigation }) => {

    const noIndoorMap = true;

    const [isOutdoor, setisOutdoor] = useState(true);

    const toggleIndoor = () => {
        setisOutdoor(!isOutdoor);
    }

    const route = useRoute();

    const [destination, setDestination] = useState(null);
    const [location, setLocation] = useState(null);

    const [hasLocation, setHasLocation] = useState(false);
    const [navigate, setNavigate] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setLocation(null);
            }
        }, [])
    );

    useEffect(() => {
        if (route.params) {
            const params = route.params;
            if (params.location && LOCATION_LIST.some(item => item.title === params.location.title)) {
                setLocation(params.location);
                setHasLocation(true);
            }
        }
    }, [route.params]);


   useEffect(() => { 
        if (location) {
            console.log("location: ", location);
        }
        
    }
    , [location]);

    useEffect(() => {   
        if (destination) {
            console.log("destination: ", destination);
        }
        
    }
    , [destination]);

    const searchButtonHandler = () => {
        console.log("Search button pressed");
        setNavigate(!navigate);
    }

    const [coords, setCoords] = useState([]);
    useEffect(() => {
        const getDirections = async () => {
            if (location && destination) {
                try {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=${API_KEY}`
                    );
                    const data = await response.json();
                    const points = polyline.decode(data.routes[0].overview_polyline.points);
                    const coords = points.map(point => {
                        return  {
                            latitude : point[0],
                            longitude : point[1]
                        }
                    })
                    setCoords(coords);
                } catch (error) {
                    console.error(error);
                }
                Toast.show({
                    type: "info",
                    position: "top",
                    text1: "Path Optimized",
                    visibilityTime: 1000,
                    autoHide: true,
                });
            };
        }
        getDirections();
    }, [navigate]);



    return (
        <View style={styles.container}>
            <View style={{flex: 1.3, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height:'auto', backgroundColor: "#35dba1"}}>
                <View style={{ flex:1, flexDirection: "column", justifyContent: "space-between", alignItems: "baseline", width: "100%", height:'auto',  backgroundColor: "#35dba1"}}>
                        <Text style={styles.text}>Current Location</Text>
                        <LocationInput 
                        onSelectItem={(item) => setLocation(item)} 
                        inputText={location} 
                        />

                        <Text style={styles.text}>Destination</Text>

                        <LocationInput 
                        onSelectItem={(item) => setDestination(item)} 
                        />
                </View>
                <Pressable
                    style={styles.searchButton}
                    onPress={searchButtonHandler}
                >
                    <Entypo name="direction" size={30} color="black" />
                </Pressable>
            </View>

            {isOutdoor?
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 22.28397046866389,
                        longitude: 114.13778878446234,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,

                    }}
                    provider="google"
                    loadingEnabled
                    rotateEnabled={false}
                    showsUserLocation={!hasLocation}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    showsScale={true}
                >
                    {location && location.id != '0' && destination && 
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>From: {location.title}    Building: {location.building}   Floor: {location.floor}</Text>
                        <Text style={styles.infoText}>To: {destination.title}   Building: {destination.building}    Floor: {destination.floor}</Text>
                    </View>}
                    <Polyline
                        coordinates={coords}
                        strokeColor="blue"
                        strokeWidth={6}
                    />
                    {location && <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.title}
                        pinColor="green"
                    />}
                    {destination && <Marker
                        coordinate={{
                            latitude: destination.latitude,
                            longitude: destination.longitude,
                        }}
                        title={destination.title}
                        pinColor="red"
                    />}
                    <Text style={styles.switchBtn} onPress={toggleIndoor}>View Indoor Map</Text>
                </MapView>     
            :
            <View style={styles.indoormap}>
                {
                    noIndoorMap?
                    <Text style={styles.infoText}>Indoor Map not available.</Text>
                    :
                    <Image source={require('../../assets/indoor.png')} 
                                    style={styles.indoormapImg}
                    />
                }
                    <Text style={styles.switchBtn} onPress={toggleIndoor}>View Outdoor Map</Text>
            </View>
            }


        <Toast/>
        </View>
    )

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    infoSection: {
        position: "absolute",
        top: 0,
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 5,
        opacity: 1,
    },
    infoText: {
        width: "100%",
        color: "black",
        fontWeight: "bold",
        flexWrap: "wrap",
        fontSize: 12,
        textAlign: 'justify',
    },
    inputArea: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 'auto',
        backgroundColor: "#35dba1",
    },

    text: {
        fontSize: 16,
        width: "80%",
        fontWeight: "bold",
        color: "white",
        marginLeft: 15,
    },

    textInput: {
        height: 'auto',
        width: "80%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginHorizontal: 5,
        marginLeft: 10,
        zIndex:3,
    },

    searchButton: {
        height: 'auto',
        width: "auto",
        borderWidth: 1,
        padding: 10,
        paddingRight: 15,
        backgroundColor: "white",
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    switchBtn: {
        position: "absolute",
        bottom: 5,
        width: "auto",
        opacity: 0.9,
        backgroundColor: "white",
        borderColor: "#35dba1",
        borderWidth: 2,
        borderRadius: 8,
        padding: 14,
        alignSelf: "center",

        color: "#0048fc",
        fontSize: 18,
        fontWeight: "bold",
    },

    switchText: {
        position: "relative",
        color: "#0048fc",
        fontSize: 18,
        fontWeight: "bold",
    },

    map: {
        flex: 4,
        width: "100%",
        position: "relative",
    },

    indoormap: {
        flex: 4,
        width: "100%",
        backgroundColor: "#F2F6FB",
    },
    indoormapImg: {
        flex: 1,
        width: "100%",
        resizeMode: "contain",
    },

});

export default MapScreen;