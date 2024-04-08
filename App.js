import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import LandingPage from "./pages/LandingPage";
import AddRestaurantPage from "./pages/AddRestaurantPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";
import RestaurantPage from "./pages/RestaurantPage";
import { LocationProvider } from './context/LocationContext';
import BusinessMenuPage from "./pages/BusinessMenuPage";
import Faq from "./pages/Faq";
import HomePage from "./pages/HomePage";
import Header from "./component/Header"
import HomePageBusiness from "./pages/HomePageBusiness";
// import UserSignUp from './pages/UserSignUp'
import { CurrentPageProvider } from "./context/CurrentPageContext";
import { UserProvider } from "./context/UserContext";
import { LogBox } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

const Stack = createNativeStackNavigator();

export default function App() {
  // LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'])
  return (
<UserProvider>
    <CurrentPageProvider>
    <LocationProvider>
      <PaperProvider>
      <EventProvider>
        <NavigationContainer>
        <Header />
          <Stack.Navigator>
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ title: '', headerShown: false}}
            />
            <Stack.Screen
              name="AddRestaurantPage"
              component={AddRestaurantPage}
              options={{ title: "Add restaurant page" }}
            />
            <Stack.Screen
              name="BusinessMenuPage"
              component={BusinessMenuPage}
              options={{ title: "Add menu page" }}
            />
            <Stack.Screen
              name="ResultsPage"
              component={ResultsPage}
              options={{ title: "Result Page" }}
            />
            <Stack.Screen
              name="RestaurantPage"
              component={RestaurantPage}
              options={{ title: "RestaurantPage" }}
            />
            <Stack.Screen
              name="SearchPage"
              component={SearchPage}
              options={{ title: "Search Page" }}
            />
            <Stack.Screen
              name="HomePageBusiness"
              component={HomePageBusiness}
              options={{ title: "Home Page Business", headerShown: false }}
            />
 
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: "Home Page", headerShown: false }}
            />
            <Stack.Screen
              name="Faq"
              component={Faq}
              options={{ title: "Faq", headerShown: false }}
            />
            {/* <Stack.Screen
              name="UserSignUp"
              component={UserSignUp}
              options={{ title: "User Sign Up", headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
        </EventProvider>
      </PaperProvider>
    </LocationProvider>
    </CurrentPageProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
