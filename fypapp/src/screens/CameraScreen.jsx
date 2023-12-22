import { useState, useEffect, useRef } from "react";
import React from "react";
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Camera } from 'expo-camera';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const CameraScreen = () => {

    const [connection, setConnection] = useState(null);
    const [response, setResponse] = useState(null);
    const [imageStream, setImageStream] = useState(null);

    const cameraRef = useRef(null);
    const captureInterval = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setIsCapturing(true);
            console.log("CameraScreen focused");
            return () => {
                setIsCapturing(false);
                console.log("CameraScreen unfocused");
            };
        }, [])
    );
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestMicrophonePermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }
    , []);

    useEffect(() => {
        if (isCapturing) {
            startCapture();
        } else{
            stopCapture();
        }
    }, [isCapturing]);


    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const startCapture = () => {
        captureInterval.current = setInterval(() => {
            if (isCameraReady) {captureImage();
            console.log("Capturing image");}
          }, 300);
    };

    const stopCapture = () => {
        if (captureInterval.current) {
            clearInterval(captureInterval.current);
          }
    };


    const captureImage = async () => {
        if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log(uri);
        // Send the image to the server using a network request
        // You can use a library like axios to send the image data to the server
        // Example: axios.post('http://your-server-url', { imageUri: uri });
        
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                ratio={"16:9"}
                onCameraReady={onCameraReady}
            >
            </Camera>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
});

export default CameraScreen;
