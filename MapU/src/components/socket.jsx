import { useState, useEffect, useRef } from "react";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const serverURL = `ws://192.168.68.102:5001`;

const socket = () => {
    const socketRef = useRef(null);
    const [response, setResponse] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!isConnected) {
            console.log("Connecting to server");
            const open = () => {
                console.log("Connected to server");
                setIsConnected(true);
            }
            const message = (data) => {
                setResponse(data);
            }
            const close = () => {
                console.log("Connection closed");
            }
            const disconnect = () => {
                console.log("Disconnected from server");
            }
            const error = (e) => {
                console.log("Error: ", e);
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

    return { socketRef, response, isConnected };
};

export default socket;