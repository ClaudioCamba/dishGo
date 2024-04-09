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
  },
  searchContainer: {
    top: 0,
    paddingTop: 30,
    position: "absolute", 
    zIndex:999, 
    width: "100%"
  },
  imageWrap:{
    alignItems: "center"
  },
  image: {
    width: 335, 
    height: 294
  },
  headerText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: 260,
  }
});