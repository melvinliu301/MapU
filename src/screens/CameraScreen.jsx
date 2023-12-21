import { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Camera } from 'expo-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();

const CameraScreen = () => {

    const [connection, setConnection] = useState(null);
    const [response, setResponse] = useState(null);
    const [imageStream, setImageStream] = useState(null);

    const cameraRef = useRef(null);
    const captureInterval = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);

    useEffect(() => {
        setIsCapturing(true);
    }, [null]);

    useEffect(() => {
        if (isCapturing) {
            startCapture();
        } else{
            stopCapture();
        }
    }, [isCapturing]);

    const handleCapture = () => {
        setIsCapturing(!isCapturing);
      };

    const startCapture = () => {
        captureInterval.current = setInterval(() => {
            captureImage();
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
