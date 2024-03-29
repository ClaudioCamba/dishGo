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
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        {/* <Image
      style={styles.image}
      source={require("../assets/white-disgo.png")}
    /> */}
        {/* <View>
      <Text style={styles.locationHeaderText}>Where Would You Like To Search?</Text>
    </View> */}
        <View style={{ justifyContent: "flex-start" }}>
          <SearchArea />
          <SearchBar setUserSearch={setUserSearch} userSearch={userSearch} />
        </View>
        <View style={styles.headerWrap}>
          <Text style={styles.headerText}>What are you in the mood for?</Text>
        </View>
        <View style ={{alignItems: "center"}}>
        <Image
      source={require("../assets/donut-lady.png")} style={{width: 335, height:294}} />
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "#3AD6A7",
    paddingBottom: 0,
  },
  image: {
    width: 70,
    height: 78,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 32,
    marginLeft: '40%',
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 30,
  },
  locationHeaderText: {
    marginLeft: 60,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: 260,
    marginTop: -10,
    marginBottom: 10,
  },  
  headerText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: 260,
  },
  searchButton: {
    width: 139,
    height: 57,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);