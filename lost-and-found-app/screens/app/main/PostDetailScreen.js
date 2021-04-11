import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import i18n from "i18n-js";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { API_URL } from "@env";
import Loader from "../../../components/UI/Loader";
import { useSelector } from "react-redux";

import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";
import CategoryList from "../../../components/app/main/CategoryList";
import HeaderButton from "../../../components/UI/HeaderButton";
import { showError } from "../../../shared/utils";
import UserInformation from "../../../components/app/main/UserInformation";
import MyButton from "../../../components/UI/MyButton";

const PostDetailScreen = (props) => {
  const user = useSelector((state) => state.user);
  const [postOwner, setPostOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const {
    description,
    imageUrl,
    mapUrl,
    location,
    categoryId,
    address,
    title,
    uid,
  } = props.route.params;

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(`${API_URL}/user?uid=${uid}`);

        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(data.message);
        }

        setPostOwner(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        showError(`${i18n.t("postDetailScreen.error")} (${err.message})`);
        props.navigation.pop();
      }
    };
    // check if this post is created by current user
    if (uid !== user.uid) {
      init();
    } else {
      setPostOwner({
        email: user.email,
        nickname: user.nickname,
        picture: user.imageUrl,
      });
      setIsLoading(false);
    }
  }, [uid, user]);

  useEffect(() => {
    // check if this post is created by current user
    if (uid !== user.uid) {
      props.navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName={
                Platform.OS === "android" ? "md-chatbubbles" : "ios-chatbubbles"
              }
              color="black"
              onPress={() => {
                props.navigation.navigate("Chat", {
                  toUser: postOwner,
                });
              }}
            />
          </HeaderButtons>
        ),
      });
    }
  }, [uid, user, postOwner]);

  const pressLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  return (
    <ScrollView style={styles.screen}>
      {isLoading ? (
        <Loader visible />
      ) : (
        <>
          <View style={styles.titleContainer}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header1")}
            </MyText>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <MyText style={styles.text}>{title}</MyText>
          </View>

          <View style={{ ...styles.titleContainer, paddingBottom: 0 }}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header2")}
            </MyText>
          </View>

          <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
            <UserInformation
              imageUrl={postOwner.picture}
              email={postOwner.email}
              nickname={postOwner.nickname}
            />
            {uid !== user.uid && (
              <MyButton
                title={i18n.t("postDetailScreen.buttonTitle")}
                style={{
                  marginTop: 25,
                  padding: 5,
                  width: "90%",
                }}
                withIcon
                onPress={() => {
                  props.navigation.navigate("Chat", {
                    toUser: postOwner,
                  });
                }}
              />
            )}
          </View>

          <View style={styles.titleContainer}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header3")}
            </MyText>
          </View>

          <CategoryList selectedMode categoryId={categoryId} />

          <View style={styles.titleContainer}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header4")}
            </MyText>
          </View>

          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>

          <View style={styles.titleContainer}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header5")}
            </MyText>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <MyText style={styles.text}>{description}</MyText>
          </View>

          <View style={styles.titleContainer}>
            <MyText style={styles.title}>
              {i18n.t("postDetailScreen.header6")}
            </MyText>
          </View>

          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            onPress={pressLocationHandler}
          >
            <Image style={styles.image} source={{ uri: mapUrl }} />
          </TouchableOpacity>

          <View style={styles.addressContainer}>
            <MyText style={styles.text}>{address}</MyText>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  titleContainer: {
    paddingVertical: 25,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
  },
  addressContainer: {
    paddingTop: 25,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
  text: {
    fontSize: 15,
  },
});

export const screenOptions = (navData) => {
  const { title } = navData.route.params;
  return {
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default PostDetailScreen;
