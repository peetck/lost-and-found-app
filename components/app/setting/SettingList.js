import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingList = (props) => {
    return (
        <TouchableOpacity
            style={styles.contentBox}
            onPress={props.onPress}
            activeOpacity={0.6}>
            <Ionicons
                name={props.IconName}
                size={25}
                color="black" 
                style={styles.contentIcon}/>
            <Text style={styles.contentText}>{props.SettingLabel}</Text>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    contentBox: {
        flexDirection: "row",
        alignItems: "center",
    }, contentIcon: {
        padding: 8,
    },
    contentText: {
        paddingLeft: 10, fontSize: 15
    },
});

export default SettingList;
