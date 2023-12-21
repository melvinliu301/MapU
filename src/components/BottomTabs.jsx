import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { SafeAreaView, Platform, Text } from "react-native";
import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen.jsx";
import SettingScreen from "../screens/SettingScreen";


const Tab = createBottomTabNavigator();

const BottomTabs = () => {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#35dba1"}}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#35dba1",
                        height:55,
                        paddingBottom: 2,
                        borderTopWidth: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                        marginTop: 0
                    },
                    headerStyle: {
                        backgroundColor: "#35dba1",
                        borderStyle: "solid",
                        shadowColor: "transparent",
                        height: 43.5,
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                    },
                    headerTintColor: "white",
                    
                }}
                initialRouteName="Map"
                headershadowVisible={false}
                sceneContainerStyle={{
                    backgroundColor: "white",
                }}
            >

                <Tab.Screen 
                    name="Camera" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="camera" size={36} color={focused ? "white" : "gray"} />
                        ),
                        
                        headerShown: false,
                    }}
                >
                    {() => <CameraScreen/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Map" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="map" size={28} color={focused ? "white" : "gray"} />
                        ),
                        ...(Platform.OS === "android" && {
                                headerTitle: () => (
                                    <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Map</Text>
                                ),
                                headerStyle: {
                                    backgroundColor: "#35dba1",
                                    borderStyle: "solid",
                                    shadowColor: "transparent",
                                    height: 80,
                                },
                                headerTitleStyle: {
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    color: "white",
                                },
                                headerTintColor: "white",
                                headerShown: true,
                        }),
                    }}
                >
                    {() => <MapScreen/>}
                </Tab.Screen>
                
                <Tab.Screen 
                    name="Setting" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="setting" size={28} color={focused ? "white" : "gray"} />
                        ),
                        // headerTitle: () => (
                        //     <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Custom title</Text>
                        // ),
                        headerShown: false,
                    }}
                >
                    {() => <SettingScreen/>}
                </Tab.Screen>

            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default BottomTabs;