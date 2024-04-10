import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { calculateDistance } from "../utils/calculateDistance";
import { LocationContext } from "../context/LocationContext";
import { mergeDishCardData } from "../utils/mergeDishCardData";
import { getDishImageByUrl } from "../utils/getDishImageByUrl";

const ResultDishCard = ({
  dish,
  restaurants,
  restaurantsPlaces,
  // setCardCount,
  setMapResults,
  storeMapResults,
  all,
  index,
  onMapView = null,
}) => {
  const navigation = useNavigation();
  const { location, radius } = useContext(LocationContext);
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState(null);
  const [imgUri, setImgUri] = useState(null);

  useEffect(() => {
    if (results && results[0].img_url) {
      getDishImageByUrl(results[0].img_url, "business_images", setImgUri);
    }
  }, [results]);

  useEffect(() => {
    if (location && results && radius) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        results[2].geometry.location.lat,
        results[2].geometry.location.lng
      );
      setIsVisible(distance < radius * 1609);
      if (distance < radius * 1609) {
        storeMapResults(results);
      }
    }
  }, [location, results, setMapResults]);

  useEffect(() => {
    const mergedResults = mergeDishCardData(
      dish,
      restaurants,
      restaurantsPlaces
    );
    setResults(mergedResults);
  }, [dish, restaurants, restaurantsPlaces]);

  if (!isVisible || !results || !results[2]) {
    return null;
  }

  return (
    <View style={[styles.card, all ? all.length-1 === index ? styles.lastItem : null : null, onMapView ? styles.onMapView : null]}>
      <View style={styles.contentContainer}>
        <View style = {styles.leftSide}>
          <Image
            source={
              imgUri ? { uri: imgUri } : require("../assets/tempfoodimage.jpg")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.rightSide}>
          <Text style={[styles.cardTextBold, styles.doubleLine]}>{dish.dish_name}</Text>
          <Text style={[styles.cardText, styles.doubleLine]}>{results[1].name}</Text>
          <Text style={styles.cardText}><Icon name="star" size={13} color="white" /> {results[2].rating}</Text>
          <Text style={styles.cardTextBold}>{`£${dish.price.toFixed(2)}`}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          icon="store-marker-outline"
          iconColor={"#4C5B61"}
          style= {styles.button}
          size={40}
          onPress={() => navigation.navigate("RestaurantPage", { results })}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    display: "flex",
    flexDirection: "row", // Ensure content layout is row-based
    alignItems: "flex-start", // Align items to the top of the container
  },
  card: {
    borderRadius: 31,
    backgroundColor: "#3AD6A7",
    marginBottom: 18,
    marginHorizontal: 26,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  leftSide:{
    flex: 0.67,
  },
  rightSide:{
    flex: 1,
    paddingVertical: 10,
    display: "flex",
  },
  image: {
    width: 144, // Adjust width as needed
    borderRadius: 31,
    height: 155,
  },
  cardText:{
    fontSize: 14,
    color: "white",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  cardTextBold:{
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  doubleLine:{
    maxHeight: 37,
    overflow: "hidden",
  },
  buttonsContainer:{
    position: "absolute",
    right: 5,
    bottom: 5,
    alignItems:'flex-end'
  },
  button: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  mapButton: {
    backgroundColor: "white",
    color: "#3AD6A7",
  },
  restaurantButton: {
    backgroundColor: "#4C5B61",
    color: "white",
  },
  lastItem: {
    marginBottom: 40,
  },
  onMapView: {
    backgroundColor: "#4C5B61",
  }
});

export default ResultDishCard;
