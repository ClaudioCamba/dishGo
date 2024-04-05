import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { getDishesName } from '../utils/getDishes';
import { filterSuggestions } from '../utils/filterSuggestions';
import { filterSearch } from '../utils/filterSearch';
import { List } from 'react-native-paper';
import { Searchbar, Surface } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import OutsidePressHandler from 'react-native-outside-press';

export default function SearchBar({userSearch, setUserSearch}) {
    const navigation = useNavigation();
    const [dishes, setDishes] =  useState([]);
    const [filterDishes, setFilterDishes] =  useState([]);
    const [filteredSuggestions, setFilteredSuggestions] =  useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() =>{
    getDishesName().then((data)=>{
      setDishes(data);
    });
  },[])
 
  const onChangeText = async (e) =>{
    setSearchQuery(e)
    setUserSearch(e)
    if (searchQuery.length > 1 && filterSearch(dishes, searchQuery).length > 0){
      const filteredSearches = filterSearch(dishes, searchQuery)
      const firstFiveSuggestions = filterSuggestions(dishes, searchQuery)
      setFilterDishes(filteredSearches);
      setFilteredSuggestions(firstFiveSuggestions);
    } else {
      setFilterDishes([])
      setFilteredSuggestions([]);
    }
  }

  const dishSelected = (dishName) => {
    setFilterDishes([]);
    setUserSearch(dishName)
    navigation.navigate('ResultsPage', {dish: dishName})
  }
  
    const getItemText = (item, index) =>{
      console.log(filteredSuggestions.length-1)
      console.log(index)
      return (
        <View  style={[styles.listItem, index % 2 === 0 ? styles.oddItem : styles.evenItem, index === filteredSuggestions.length-1 ? styles.lastItem: null]}>
            <List.Icon color="#A6A6A6" icon="magnify" />
            <Text style={styles.listText}>{item.dish_name}</Text>
        </View>
    )}
  
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.SafeAreaView}>
            <Searchbar
                onSubmitEditing={(event) => { navigation.navigate('ResultsPage', {dish: userSearch}) }}
                fontWeight="bold"
                placeholderTextColor="#A9A9AC"
                mode="bar"
                elevation={3}
                iconColor="#3AD6A7"
                placeholder='Find Dish'
                onIconPress={()=>{ navigation.navigate('ResultsPage', {dish: userSearch}) }}
                onClearIconPress={()=>{ setFilterDishes([]) }}
                onChangeText={onChangeText}
                value={searchQuery}
                style={styles.searchBar} />

                {
                  filteredSuggestions.length > 0 ?
                  <OutsidePressHandler
                  onOutsidePress={() => setFilterDishes([])}>
                  <Surface style={styles.surface} elevation={0}>
                    <FlatList
                        data={filteredSuggestions}
                        renderItem={({ item, index}) => <Pressable onPress={() => {
                        setSearchQuery(item.dish_name);
                        dishSelected(item.dish_name);
                        } }>
                        {getItemText(item,index)}
                        </Pressable>}
                        keyExtractor={item => item.dish_name}
                        showsVerticalScrollIndicator={true} 
                    />
                  </Surface> 
                   </OutsidePressHandler>: null
                }

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

const styles = StyleSheet.create({
  SafeAreaView:{
    paddingHorizontal: 30
  },
  searchBar:{
    marginTop: 10,
    color:'#FFF',
    zIndex: 10,
    backgroundColor:'#FFFFFF',
    height: 52,
    width: '100%'
  },
  surface: {
    marginTop: -53,
    paddingTop: 60,
    // marginBottom: 110,
    alignItems: 'left',
    justifyContent: 'center',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor:'#FFFFFF',
    maxHeight: 270,
    width: '100%',
    // paddingBottom: 50,
  },
  listItem:{
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },
  listText:{
    paddingLeft: 16,
    fontWeight: "bold",
    color: "#A6A6A6",
  },
  evenItem:{
    backgroundColor: "#EBFCF6"
  },
  lastItem:{
    paddingBottom: 60,
  }
});