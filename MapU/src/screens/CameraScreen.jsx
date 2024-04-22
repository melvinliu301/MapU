import { useState, useEffect, useRef } from "react";
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import * as FileSystem from 'expo-file-system';


const CameraScreen = () => {

    const navigation = useNavigation();

    // URL differs for different networks
    const serverURL = `ws://10.68.59.238:5001`;

    const [isFocused, setIsFocused] = useState(false);

    const cameraRef = useRef(null);
    const [videoQueue, setVideoQueue] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    const toastInterval = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [screenText, setScreenText] = useState("Disconnected. Please check the network connection.");

    const [responseQueue, setResponseQueue] = useState([]);
    const [blockResponse, setBlockResponse] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);


    const socketRef = useRef(null);
    const [response, setResponse] = useState(null);
    const [isConnected, setIsConnected] = useState(false);


    useEffect(() => {
        if (!isConnected) {
            console.log("Connecting to server");
            const open = () => {
                console.log("Connected to server");
                setIsConnected(true);
                setScreenText('Move Camera around to capture your surroundings');
            }
            const message = (data) => {
                if (data.data !== "Connected" && data.data !== "Disconnected" && data.data !== "Error") {
                    const dataObj = JSON.parse(data.data.replace(/'/g, '"'));
                    setResponseQueue([...responseQueue, dataObj]);
    
                }
            }
            const close = () => {
                console.log("Connection closed");
                setIsConnected(false);
            }
            const disconnect = () => {
                console.log("Disconnected from server");
                setIsConnected(false);
                setScreenText('Disconnected. Please check the network connection.');
                Alert.alert('Connection Error', 'Unable to connect to server',
                [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }   
                ]);
            }
            const error = (e) => {
                console.log("Error: ", e);
                setScreenText('Disconnected. Please check the network connection.');
                Alert.alert('Connection Error', 'Unable to connect to server',
                [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }   
                ]);
                setIsConnected(false);
            }
            socketRef.current = new W3CWebSocket(serverURL);
            try {
                if (socketRef.current !== null){
                    
                    socketRef.current.onerror = error;

                    socketRef.current.onopen = open;

                    socketRef.current.onmessage = message;

                    socketRef.current.onclose = close;

                    socketRef.current.ondisconnect = disconnect;
                }

            } catch (error) {
                console.error("Error: ", error);
                setIsConnected(false);
            }
        }
    }
    , [isConnected]);
        

    useEffect(() => {
        if (checkResponse(response))  {
            setBlockResponse(true);
            Alert.alert('Success', 'Current Location is found: ' + response.title + ', latitude: ' + response.latitude + ', longitude: ' + response.longitude + '.',
            [
                {
                    text: 'Continue Capturing',
                    onPress: () => {
                        setResponse(null); 
                        setIsCapturing(true);
                        setBlockResponse(false);
                        setResponseQueue([]);
                    },
                    style: 'cancel'
                },
                {
                    text: 'Go to Map',
                    onPress: () => navigation.navigate("Map", {location: response}),
                    style: 'cancel'
                }
            ]);
        } else {
            if (responseQueue.length > 0) {
                setResponse(responseQueue[0]);
                setResponseQueue(responseQueue.slice(1));
            }
        
        }
    }, [responseQueue, response]);


    useEffect(() => {
       const fetchVideoBytes = async () => {
            if (videoQueue.length > 0) {
                const video = videoQueue[0];
                const videoBytes = await FileSystem.readAsStringAsync(video.uri, { encoding: FileSystem.EncodingType.Base64 });
                socketRef.current.send(videoBytes, (error) => {
                    if (error) {
                        console.error('Failed to send chunk: ', error);
                    }
                });
                console.log("Image sent to server");
                await FileSystem.deleteAsync(video.uri, { idempotent: true });
                setVideoQueue(videoQueue.slice(1));
            }
        }
        if (!blockResponse && videoQueue.length > 0) {
            fetchVideoBytes();
        }
    }, [videoQueue]);

    
    useEffect(() => {
        if (isConnected && isFocused && !isRecording) {
            captureImage();
        }
    }, [isConnected, isFocused, isRecording]);

    const captureImage = async () => 
    {
        if (cameraRef.current) {
            setIsRecording(true);

            const video = await cameraRef.current.recordAsync({ maxDuration: 1, quality: Camera.Constants.VideoQuality["720p"], mute: true});
            if (video) {   
                setVideoQueue([...videoQueue, video]);
            }
            console.log("Image captured");
        
            setTimeout(() => setIsRecording(false), 500);
        }
        return;
    
    };


    useFocusEffect(
        React.useCallback(() => {
            setIsCapturing(true);
            setIsFocused(true);
            console.log("CameraScreen focused");
            return () => {
                setIsCapturing(false);
                setIsFocused(false);
                setBlockResponse(false);
                setResponseQueue([]);
                setResponse(null);
                console.log("CameraScreen unfocused");
            };
        }, [])
    );

    useEffect(() => {
        console.log("isConnected: ", isConnected);
        if (isConnected) {
            setScreenText('Move Camera around to capture your surroundings');
        }
    }, [isConnected, isFocused]);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }
    , []);


    useEffect(() => {
        clearInterval(toastInterval.id);

        if (isCapturing && isConnected) {

              toastInterval.id = setInterval(() => {
                Toast.show({
                    type: "info",
                    position: "top",
                    text1: "Try to find some iconic marks or landmarks",
                    visibilityTime: 5000,
                    autoHide: true,
                });
            }, 15000);  
            
        } 

        return () => {
            clearInterval(toastInterval.id);
        }
    }, [isCameraReady, isCapturing, isConnected]);

    const checkResponse = (response) => {
        if (!blockResponse && response && response.title != '') {
            if (response.latitude && response.longitude) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };


    const onCameraReady = () => {
        setIsCameraReady(true);
        console.log("Camera ready");
    };

    return (
        <View style={styles.container}>
            {hasPermission? <Camera
                ref={cameraRef}
                style={styles.camera}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                ratio={"16:9"}
                onCameraReady={onCameraReady}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.camText}>{screenText}</Text> 
                </View>
            </Camera>
            :<Text>No access to camera. Please grant the camera access.</Text>}
            <Toast/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 100,
        
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

    camText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: "70%",
        
    },
});

export default CameraScreen;
