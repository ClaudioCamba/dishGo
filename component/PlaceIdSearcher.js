import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; // never save your real api key in a snack!

const TestPlaceIdSearcher = ({setPlaceId, searcherPlaceHolder, setSearcherPlaceHolder}) => {

  return (
    <ScrollView 
    // style={styles.container}
    nestedScrollEnabled={true}
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps={'handled'}>
      <GooglePlacesAutocomplete
        placeholder = {searcherPlaceHolder? searcherPlaceHolder : "Search for restaurant"}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => {
          console.log(data)
          setPlaceId(data.place_id)
          setSearcherPlaceHolder(data.description)
        }
        }
        onFail={(error) => console.error(error)}
      />
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#ecf0f1',
//     height: "100%"
//   },
// });

export default TestPlaceIdSearcher;
