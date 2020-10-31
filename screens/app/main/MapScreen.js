import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../../components/UI/HeaderButton";
import { getCurrentPosition } from "../../../shared/utility";
import Colors from "../../../constants/Colors";

const MapScreen = (props) => {
  const { readonly } = props.route.params;
  const [selectedLocation, setSelectedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    const location = await getCurrentPosition();
    setSelectedLocation(location);
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  let markerCoordinates;
  let mapRegion;

  if (selectedLocation) {
    mapRegion = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.long,
    };
  }

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate("CreatePost", {
      location: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
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

  return isLoading ? (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = {
  headerTitle: "Select location",
};

export default MapScreen;
