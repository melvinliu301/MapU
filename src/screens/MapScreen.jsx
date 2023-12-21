import { Toasts, toast } from "@backpackapp-io/react-native-toast";
import * as Location from "expo-location";
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

    const InputArea = () => {
        return (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "#35dba1"}}>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "#35dba1"}}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "#35dba1"}}>
                        <Text style={styles.text}>Location</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setLocationInput(text)}
                            value={locationInput}
                            placeholder="Enter location"
                        />
                    </View>

                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "#35dba1"}}>
                        <Text style={styles.text}>Destination</Text>
                        <TextInput
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
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <InputArea />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
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
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    textInput: {
        height: 40,
        width: "90%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        marginVertical: 5,
    },
    searchButton: {
        height: 40,
        width: "90%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});