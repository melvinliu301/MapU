import { useState, useEffect, useRef } from "react";
import React from "react";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {WebView} from 'react-native-webview';

const InfoScreen = () => {
    
        const navigation = useNavigation();
    
        return (
            <WebView source={{ uri: 'http://www.maps.hku.hk/mobile/#home' }} />
        );
    };

export default InfoScreen;