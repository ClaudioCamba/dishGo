import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  LogBox, 
  ImageBackground
} from "react-native";
import { useState } from "react";
import SearchBar from "../component/SearchBar";
import SearchArea from "../component/SearchArea";

export default function SearchPage({ navigation }) {
  const [userSearch, setUserSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchArea />
        <SearchBar setUserSearch={setUserSearch} userSearch={userSearch} />
      </View>

      <View style={styles.imageWrap}>
        <Text style={styles.headerText}>What are you in the mood for?</Text>
        <Image source={require("../assets/donut-lady.png")} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-end",
    backgroundColor: "#3AD6A7",
    paddingBottom: 0,
  },
  searchContainer: {
    top: 0,
    borderWidth: 1,
    position: "absolute", 
    zIndex:999, 
    width: "100%"
  },
  imageWrap:{
    alignItems: "center"
  },
  image: {
    width: 335, 
    height:294
  },
  // headerWrap: {
  //   alignItems: "center",
  //   paddingTop:20,
  //   paddingBottom: 10,
  //   marginTop: 170,
  // },
  // locationHeaderText: {
  //   color: "#FFF",
  //   fontWeight: "bold",
  //   fontSize: 25,
  //   textAlign: "center",
  // },  
  headerText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: 260,
  },
  // searchButton: {
  //   width: 139,
  //   height: 57,
  //   backgroundColor: "#4C5B61",
  //   borderRadius: 29,
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // searchButtonText: {
  //   color: "#FFF",
  //   fontWeight: "bold",
  //   fontSize: 18,
  // },
});