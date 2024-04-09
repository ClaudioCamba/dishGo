import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Pressable } from "react-native";
import { List } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import getPlacesById from "../utils/getPlacesById";
import { LocationContext } from "../context/LocationContext";

const SearchArea = () => {
  const { location, setLocation, radius, setRadius } = useContext(LocationContext);
  const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const [placeId, setPlaceId] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Location");

  useEffect(() => {
    if(!placeId)handleUserLocation()
    if (placeId) {
      getPlacesById(placeId)
        .then((response) => {
          const { data } = response;
          const location = data.result.geometry.location;
          const address = data.result.formatted_address;
          const locationObj = {
            coords: { latitude: location.lat, longitude: location.lng },
          };
          setPlaceholder(address);
          setLocation(locationObj);
        })
        .catch((error) => {
          console.error("Error fetching place details:", error);
        });
    }
  }, [placeId]);

  const handleUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setPlaceholder(address);
      } else {
        console.error("No address found for the current location");
      }
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
      <View style={styles.searchBar} elevation={3}>
        <Pressable onPress={handleUserLocation}  style={styles.setLocationIcon}>
          <List.Icon color="#3AD6A7" icon="crosshairs" />
        </Pressable>
        <GooglePlacesAutocomplete
          disableScroll={false}
          isRowScrollable={true}
          placeholder={placeholder}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => { setPlaceId(data.place_id); }}
          onFail={(error) => console.error(error)}
          styles={styles.googleAutoComplete}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 26,
    fontWeight: "bold",
    overflow: "hidden",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  setLocationIcon:{
    fontWeight: "bold",
    fontSize: 12,
    color: "#3AD6A7",
    backgroundColor: "#FFF",
    height: 52,
    borderRadius: 50,
    width: 52,
    paddingTop: 13,
    zIndex:99,
  },
  googleAutoComplete:{
    container: {
      marginLeft: -52,
    },
    textInputContainer: {
      fontWeight: "bold",
      paddingLeft: 52,
      height: 52,
    },
    textInput: {
      height: 52,
      fontSize: 14,
      width: "100%",
      overflow: "hidden",
      fontWeight: "bold",
      color: "#534E5A"
    },
    poweredContainer:{
      display: "none"
    },
    separator: {
      height: 1,
      backgroundColor: '#3AD6A7',
    }
  }
});

export default SearchArea;
