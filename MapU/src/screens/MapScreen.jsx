import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text, ImageBackground, Image} from "react-native";
import MapView, {Polyline, Marker} from "react-native-maps";
import LocationInput from "../components/LocationInput";
import { Entypo } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import LOCATION_LIST from "../constants/locationList";
import polyline from '@mapbox/polyline';
// import { indoorMap } from "../components/indoorMap";


const MapScreen = ({ navigation }) => {

    const [isFengMap, setIsFengMap] = useState(true);

    const toggleIndoor = () => {
        setIsFengMap(!isFengMap);
    }

    const API_KEY = "AIzaSyDC2rRSOkfPwtB53kvnyLHrE4mHAwLKIS0";

    const route = useRoute();

    const [destination, setDestination] = useState(null);
    const [location, setLocation] = useState(null);

    const [hasLocation, setHasLocation] = useState(false);
    const [navigate, setNavigate] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            console.log("MapScreen focused");
            return () => {
                console.log("MapScreen unfocused");
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

    // useEffect(() => {
    //     Location.requestForegroundPermissionsAsync().then((status) => {
    //         if (status.granted) {
    //             if (!location){
    //                 setHasLocation(true);
    //                 Location.getCurrentPositionAsync({}).then((location) => {
    //                     setLocation({
    //                         title: 'Current GPS Location',
    //                         latitude: location.coords.latitude,
    //                         longitude: location.coords.longitude
    //                     });
    //                 });
    //             }    
    //         }
    //     });
    // }, []);

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
            };
            getDirections();
        }
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

            {/* <Button title={isFengMap?"View Outdoor Map":"View Indoor Map"} onPress={toggleMapView}  style={styles.switchBtn}/> */}
            {isFengMap?
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
                <Pressable onPress={toggleIndoor} style={styles.switchBtn}><Text style={styles.switchText}>View Indoor Map</Text></Pressable>
            </MapView>:
            <View style={styles.indoormap}>
                <Image source={require('../../assets/indoor.png')} 
                style={styles.indoormapImg}
                />
                    <Pressable onPress={toggleIndoor} style={styles.switchBtn}><Text style={styles.switchText}>View Outdoor Map</Text></Pressable>
            </View>
            }


        
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
    },

    switchText: {
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
        // height:"auto",
        width: "100%",
        backgroundColor: "#F2F6FB",
    },
    indoormapImg: {
        flex: 1,
        width: "100%",
        // height: "100%",
        resizeMode: "contain",
    },

});

export default MapScreen;