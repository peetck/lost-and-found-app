import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Button } from "react-native";


import MyText from "../../../components/UI/MyText";


const SettingItem = (props) => {

    let defaultColor = '#0084ff';


    if (props.color != 'default'){
        defaultColor = props.color;
    }


    return (
    <View style={styles.MainBox}>
        <MyText style={{
            color:  defaultColor,
            paddingTop: 15,
            fontSize: 13,
            fontFamily: "kanit-bold"
        }}>
            {props.HeaderText}
        </MyText>
        <TouchableOpacity
            style={styles.contentBox}
            onPress={props.onPress}
            activeOpacity={0.6}>
            <MyText style={styles.contentText}>{props.title}</MyText>
            {/*}<View style={styles.ButtonLayout}>
                <Button title="edit" />
            </View>{*/}
        </TouchableOpacity>
    </View>
    );
        
    
}

const styles = StyleSheet.create({
    header: {
        color:  "#0084ff",
        paddingTop: 15,
        fontSize: 13,
        fontFamily: "kanit-bold"
    },
    contentBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
    }, contentIcon: {
        padding: 8,
    },
    contentText: {
        paddingLeft: 10, fontSize: 15
    },
    ButtonLayout: {
        paddingLeft: 250
    },
    MainBox: {
        flex: 2,
        marginTop: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    }

});

export default SettingItem;
