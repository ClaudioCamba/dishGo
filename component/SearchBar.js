import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { getDishesName } from '../utils/getDishes';
import { filterSuggestions } from '../utils/filterSuggestions';
import { List } from 'react-native-paper';
import { Searchbar, Surface } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import OutsidePressHandler from 'react-native-outside-press';

export default function SearchBar({userSearch, setUserSearch}) {
  const navigation = useNavigation();
  const currentPage = useRoute();
  const [dishes, setDishes] =  useState([]);
  const [filterDishes, setFilterDishes] =  useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() =>{
    getDishesName().then((data)=> setDishes(data));
  },[])
 
  const onChangeText = async (e) =>{

      setSearchQuery((r)=> {
      if (e.length > 2 && filterSuggestions(dishes, e).length > 0){
        setFilterDishes(filterSuggestions(dishes, e));
      } else {
        setFilterDishes([])
      }
   
      setUserSearch(e)
      return e;
    })
  }

  const dishSelected = (dishName) => {
    setFilterDishes([]);
    setUserSearch(dishName)
    navigation.navigate('ResultsPage', {dish: dishName})
  }
  
    const getItemText = (item, index) =>{
      return (
        <View  style={[
          styles.listItem, 
          index % 2 === 0 ? styles.oddItem : styles.evenItem, 
          index === filterDishes.length-1 && filterDishes.length >= 4 ? styles.lastItem: null]}>
            <List.Icon color="#A6A6A6" icon="magnify" />
            <Text style={styles.listText}>{item.dish_name}</Text>
        </View>
    )}
  
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.SafeAreaView}>
          <OutsidePressHandler onOutsidePress={() => currentPage.name ==='SearchPage' ? setFilterDishes([]): null}>
            <Searchbar
                onSubmitEditing={(event) => { navigation.navigate('ResultsPage', {dish: userSearch}) }}
                fontWeight="bold"
                placeholderTextColor="#A9A9AC"
                mode="bar"
                elevation={1}
                selectionColor={'#3AD6A7'}
                rippleColor="#3AD6A7"
                iconColor="#3AD6A7"
                placeholder='Find Dish'
                onIconPress={()=>{ navigation.navigate('ResultsPage', {dish: userSearch}) }}
                onClearIconPress={()=> setFilterDishes([])}
                onChangeText={onChangeText}
                value={searchQuery}
                style={styles.searchBar} />

                {
                  filterDishes.length > 0 ?
                  <Surface style={styles.surface} elevation={0}>
                    <FlatList
                        data={filterDishes}
                        renderItem={({ item, index}) => <Pressable key={index} onPress={() => {
                        setSearchQuery(item.dish_name);
                        dishSelected(item.dish_name);
                        } }>
                        {getItemText(item,index)}
                        </Pressable>}
                        keyExtractor={item => item.dish_name}
                        showsVerticalScrollIndicator={true} 
                    />
                  </Surface> 
                   : null
                }
          </OutsidePressHandler>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

const styles = StyleSheet.create({
  SafeAreaView:{
    paddingHorizontal: 30,
    margin: 0,
  },
  searchBar:{
    zIndex: 10,
    backgroundColor:'#FFFFFF',
    height: 52,
    width: '100%',
  },
  surface: {
    marginTop: -53,
    paddingTop: 60,
    alignItems: 'left',
    justifyContent: 'center',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor:'#FFFFFF',
    maxHeight: 240,
    width: '100%',
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