import io from 'socket.io-client';
import { useState, useEffect, useRef } from "react";

const serverURL = "http://127.0.0.1:5000";

const socket = () => {
    const socketRef = useRef(null);
    const [response, setResponse] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!isConnected) {
            
            socketRef.current = new WebSocket(serverURL);

            socketRef.current.on("error", console.error);

            socketRef.current.on("open", function open() {
                console.log("Connected to server");
                setIsConnected(true);
            }
            );

            socketRef.current.on("message", function message(data) {
                console.log("received: %s", data);
                data = JSON.parse(data);
                setResponse(data);
            }
            );

            socketRef.current.on("close", function close() {
                console.log("Connection closed");
                setIsConnected(false);
            }
            );

            socketRef.current.on("disconnect", function disconnect() {
                console.log("Disconnected from server");
                setIsConnected(false);
            }
            );
        }
    }
    , [isConnected]);

    return { socketRef, response, isConnected };
};

export default socket;