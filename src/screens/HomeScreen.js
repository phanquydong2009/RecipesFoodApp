import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategroies();
    getRecipes();
  }, []);

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategroies = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      // console.log('got categories :',response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log('error :', error.message);
    }
  };
  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      // console.log('got recipes :', response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('error :', error.message);
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
        <StatusBar barStyle="dark-content" />
        {/* Avatar and bell icon */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: wp(4),
          }}>
          <Image
            source={require('../assets/images/avatar.jpg')}
            style={{
              height: hp(5),
              width: hp(5),
              borderRadius: hp(5) / 2,
              resizeMode: 'cover',
            }}
          />
          <Image
            source={require('../assets/images/bell.png')}
            style={{height: hp(4), width: hp(4), resizeMode: 'cover'}}
          />
        </View>
        {/* Greetings and punchline */}
        <View style={{paddingHorizontal: wp(4), marginBottom: hp(2)}}>
          <Text style={{fontSize: hp(2), color: '#666666'}}>
            Hello, Admin !
          </Text>
          <Text
            style={{fontSize: hp(3.8), fontWeight: 'bold', color: '#666666'}}>
            Make Your own food,
          </Text>
          <Text
            style={{fontSize: hp(3.8), fontWeight: 'bold', color: '#666666'}}>
            stay at <Text style={{color: '#ffbf00'}}>home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            marginHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 25,
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: 50,
            paddingHorizontal: 5,
          }}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{
              flex: 1,
              fontSize: hp(1.7),
              marginLeft: 6,
              textAlignVertical: 'center',
            }}
          />
          <View
            style={{backgroundColor: 'white', borderRadius: 25, padding: 12}}>
            <Image
              source={require('../assets/images/search.png')}
              style={{width: hp(2.5), height: hp(2.5), tintColor: 'gray'}}
            />
          </View>
        </View>
       
          {/* Categories */}
          <View style={{paddingHorizontal: wp(4)}}>
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              getRecipes={getRecipes}
            />
          </View>

          {/* Recipes */}
          <View style={{flex: 1}}>
            <Recipes meals={meals} categories={categories} />
          </View>
        </View>
     
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
