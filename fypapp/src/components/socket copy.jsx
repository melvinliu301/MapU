import React from "react";
import { useState, useEffect, useRef } from "react";

const serverURL = "ws://127.0.0.1:5000";

const socket = () => {
    const socketRef = useRef(null);
    const [response, setResponse] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
       if (!isConnected) {
            socketRef.current = new WebSocket(serverURL);
            console.log('socket connected: ', socketRef.current.readyState)
            
            socketRef.current.onopen = () => {
                console.log("Connected to server");
                setIsConnected(true);
            };

            socketRef.current.onclose = () => {
                console.log("Disconnected from server");
                setIsConnected(false);
            };

            socketRef.current.onmessage = (event) => {
                console.log("Message received from server: ", event.data);
                setResponse(event.data);
            };

            socketRef.current.onerror = (error) => {
                console.log("Error: ", error);
            };
        }


    }, [isConnected]);

    return { socketRef, response, isConnected };
};

export default socket;