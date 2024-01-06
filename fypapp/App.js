import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import BottomTabs from "./src/components/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

LogBox.ignoreAllLogs(); 


const App = () => {

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

