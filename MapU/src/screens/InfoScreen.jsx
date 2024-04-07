import React from "react";
import { useNavigation } from "@react-navigation/native";
import {WebView} from 'react-native-webview';

const InfoScreen = () => {
    
        const navigation = useNavigation();
    
        return (
            <WebView source={{ uri: 'http://www.maps.hku.hk/mobile/#home' }} />
        );
    };

export default InfoScreen;