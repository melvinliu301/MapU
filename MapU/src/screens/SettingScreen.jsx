import {
    StyleSheet,
    View,
    Text,

} from "react-native";



    
const SettingScreen = () => {
    return (
        <View>
            <Text>SettingScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    editProfileContainer: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
    smallerContainer: {
        margin: 10,
        paddingVertical: 10,
    },
    dialogContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        margin: 10,
        borderWidth: 1,
        borderColor: "red",
    },
    button: {
        alignSelf: "stretch",
        borderRaius: 2,
    },
    text: {
        fontSize: 16,
        padding: 10,
    },
    textInput: {
        height: 40,
        alignSelf: "stretch",
        marginHorizontal: 10,
        marginBottom: 15,
        borderColor: "gray",
        borderBottomWidth: 1,
        fontSize: 16,
    },
    columnText: {
        flex: 1,
        minWidth: 20,
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    columnInput: {
        flex: 3,
        marginHorizontal: 10,
        borderBottomWidth: 1,
    },
    rows: {
        flexDirection: "row",
        // paddingHorizontal: 10,
        width: "100%",
        alignItems: "center",
        height: 40,
        marginVertical: 8,
    },
    touchableHighlight: {
        margin: 10,
    },
    myProfileView: {
        borderWidth: 3,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    viewMyEventButton: {
        alignItems: "center",
        paddingVertical: 10,
    },
    viewMyEventButtonText: {
        fontSize: 24,
        textDecorationLine: "underline",
    },
    dialogView: {
        // margin: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        alignSelf: "center",
    },
    editProfileButton: {
        alignItems: "center",
        padding: 5,
        flex: 1,
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "orange",
    },
    editProfileButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    quitButton: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        paddingVertical: 5,
        width: 60,
        borderRadius: 5,
        marginTop: 6,
    },
});

export default SettingScreen;
