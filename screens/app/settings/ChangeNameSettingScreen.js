import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  AppHeader,
  TextInput,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
    useActionSheet,
    connectActionSheet,
} from "@expo/react-native-action-sheet";
import { useSelector, useDispatch } from "react-redux";
import { changeNickname } from "../../../store/actions/auth";
  

import SettingItem from "../../../components/app/settings/SettingItem";

const ChangeNameSettingScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  
  {/* state */}
  const [text, setText] = useState(user.nickname);

  {/* function */}
  const renderLengthOfText = () => {
      return(
        <Text style = {styles.content}>{text.length}/100</Text>
      );
  }

  {/* return */}
  return (

    <View style = {styles.screen}>
        {renderLengthOfText()}
        <TextInput style = {styles.textInput} onChangeText = {(text) => {
            setText(text);
        }}
        value = {text}
        ></TextInput>
        <View style = {{marginTop: 12}}>
            <Button title = 'Save' 
            onPress = {async () => {
                await dispatch(changeNickname(text));
                props.navigation.navigate('ProfileSetting');
            }} ></Button>
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
  contentContainer: {
    flex: 1,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 3,
    height: 38,
    fontSize: 18,
    paddingHorizontal: 7
  },
  content: {
    fontSize: 12,
    marginBottom: 4,
    flexDirection: 'row',
    alignSelf: 'flex-end'

  }
});

export const screenOptions = {
  title: "Change Name",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default ChangeNameSettingScreen;
