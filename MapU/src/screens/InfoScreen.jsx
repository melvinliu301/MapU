import {WebView} from 'react-native-webview';

const InfoScreen = () => {   
    return (
        <WebView source={{ uri: 'http://www.maps.hku.hk/mobile/#home' }} />
    );
};

export default InfoScreen;