import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import BottomTabs from "./src/components/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import { useRef } from "react";
import io from 'socket.io-client';
// LogBox.ignoreAllLogs(); 


const App = () => {

    // const serverURL = "http://127.0.0.1:5000";
    // const socketRef = useRef();
    // const [isConnected, setIsConnected] = useState(false);

    // const connection = {
    //     isConnected: isConnected,
    //     socketRef: socketRef
    // }

    // useEffect(() => {
    //     if (!socketRef.current){
    //         socketRef.current = io( serverURL, {
    //             transports: ['websocket','polling'],
    //             timeout: 50000,
    //             reconnectionDelay: 1000,
    //             reconnectionDelayMax: 5000,
    //         }
    //          );

    //         console.log('socket connected: ', socketRef.current.connected)

    //         socketRef.current.send('message','Hello from client!');
    //         console.log("Message sent to server");

    //         socketRef.current.on('connect', () => {
    //             console.log("Connected to server");
    //             setIsConnected(true);
    //             setScreenText('Move Camera around to capture your surroundings');
    //         });
    
    //         socketRef.current.on('response', (e) => {
    //             const message = JSON.parse(e.data);
    //             console.log("Message received: ", message);
    //             setResponse(message);
    //         });
    
    //         socketRef.current.onerror = (e) => {
    //             console.log("Error: ", e.message);
    //             setIsConnected(false);
    //         };
    
    //         socketRef.current.onclose = (e) => {
    //             console.log("Connection closed: ", e.code, e.reason);
    //             setIsConnected(false);
    //         };}


    //         return () => {
    //             socketRef.current.close();
    //             setIsConnected(false);
    //         }
    //     }, []);



    return (
        <AutocompleteDropdownContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                
                    <NavigationContainer>
                    
                        <BottomTabs />
                        {/* {user ? <BottomTabs /> : <LoginRegisterScreens />} */}
                    
                    </NavigationContainer>
                    
            </GestureHandlerRootView>
        
        </AutocompleteDropdownContextProvider>
    );
};

export default App;

