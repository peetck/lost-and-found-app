import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import MyButton from "../../../components/UI/MyButton";


const ChangeEmailScreen = (props) => {
    const [email, setEmail] = useState("xxxxx@gmail.com");
    return (
        <View style={styles.screen}>
            <TextInput style={{  borderWidth:0.5,
                paddingLeft: 15, height: 50, 
                fontFamily: "kanit-light", fontSize: 18,
                  }} onChangeText={setEmail} value={email}/>
                <View style={{marginTop:20}}>
                  <MyButton title="Change" style={{fontFamily:"kanit-light"}}/>
                  </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
});

export const screenOptions = {
    headerTitle: "My Post",
    headerTitleStyle: {
        fontFamily: "kanit-light",
    },
};

export default ChangeEmailScreen;
