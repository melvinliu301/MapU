// import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text, } from "react-native";
import MapView from "react-native-maps";



const MapScreen = ({ navigation }) => {

    const [destinationInput, setDestinationInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [location, setLocation] = useState(null);

    const searchButtonHandler = () => {
        console.log("Search button pressed");
    }

   

    return (
        <View style={styles.container}>


            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height:'auto', backgroundColor: "#35dba1"}}>
                <View style={{ flex:1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", width: "100%", height:'auto',  backgroundColor: "#35dba1"}}>
                    <View style={{flex:1, flexDirection: "row", justifyContent: 'flex-start', alignItems: "baseline", width: "100%",  backgroundColor: "#35dba1"}}>
                        <Text style={styles.text}>Current Location</Text>
                        <TextInput
                            id="locationInput"
                            style={styles.textInput}
                            onChangeText={text => setLocationInput(text)}
                            value={locationInput}
                            placeholder="Enter location"
                        />
                    </View>

                    <View style={{flex: 1, flexDirection: "row", justifyContent: 'flex-start', alignItems: "baseline", width: "100%",  backgroundColor: "#35dba1"}}>
                        <Text style={styles.text}>Destination</Text>
                        <TextInput
                            id="destinationInput"
                            style={styles.textInput}
                            onChangeText={text => setDestinationInput(text)}
                            value={destinationInput}
                            placeholder="Enter destination"
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={searchButtonHandler}
                >
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>Search</Text>
                </TouchableOpacity>
            </View>


            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 22.28397046866389,
                    longitude: 114.13778878446234,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,

                }}
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
        width: "30%",
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
    },

    textInput: {
        height: 40,
        width: "60%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginHorizontal: 5,
    },

    searchButton: {
        height: 'auto',
        width: "20%",
        borderWidth: 1,
        padding: 10,
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