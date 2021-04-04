import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import i18n from "i18n-js";

import HeaderButton from "../../../components/UI/HeaderButton";

const MapScreen = (props) => {
  const { initialLocation, readonly } = props.route.params;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const currentLocation = useSelector((state) => state.user.location);
  const map = useRef(null);

  const mapRegion = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
    latitudeDelta: props.route.params.from === "Search" ? 0.1 : 0.01,
    longitudeDelta: props.route.params.from === "Search" ? 0.1 : 0.02,
  };

  const getCurrentLocationHandler = async () => {
    const location = currentLocation;
    const camera = await map.current.getCamera();
    camera.center = {
      latitude: location.lat,
      longitude: location.lng,
    };
    map.current.animateCamera(camera);
    setSelectedLocation(location);
  };

  const markerCoordinates = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate(props.route.params.from, {
      location: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    if (readonly) {
      return;
    }
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="md-save"
            color="black"
            onPress={saveLocationHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [saveLocationHandler]);

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        onPress={selectLocationHandler}
        ref={map}
      >
        <Marker title="Picked Location" coordinate={markerCoordinates} />

        {props.route.params.from === "Search" && (
          <MapView.Circle
            center={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            radius={5000}
            fillColor="rgba(0, 0, 0, 0.1)"
            strokeColor="black"
            strokeWidth={2}
          />
        )}
      </MapView>
      {!readonly && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={getCurrentLocationHandler}
          style={styles.button}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-locate" : "ios-locate"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    top: "87%",
    left: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 3,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export const screenOptions = {
  headerTitle: i18n.t("mapScreen.headerTitle"),
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default MapScreen;
