import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text, } from "react-native";
import MapView from "react-native-maps";
import LocationInput from "../components/LocationInput";
import { Entypo } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import LOCATION_LIST from "../constants/locationList";


const MapScreen = ({ navigation }) => {

    const route = useRoute();

    const [destination, setDestination] = useState('');
    const [location, setLocation] = useState(null);

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
            }
        }
    }, [route.params]);


   useEffect(() => { 
        if (location) {
            console.log("location: ", location);
        }
        else {
            console.log("location: null");
        }
    }
    , [location]);

    useEffect(() => {   
        if (destination) {
            console.log("destination: ", destination);
        }
        else {
            console.log("destination: null");
        }
    }
    , [destination]);


    const searchButtonHandler = () => {
        console.log("Search button pressed");
    }

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
            />
        
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
        height: 40,
        width: "100%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginHorizontal: 5,
        marginLeft: 10,
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

    map: {
        flex: 4,
        width: "100%",

    },

});

export default MapScreen;