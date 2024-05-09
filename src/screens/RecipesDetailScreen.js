import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown , FadeIn} from 'react-native-reanimated';


const RecipesDetailScreen = ({route, navigation}) => {
  let item = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      console.log('got meal data :', response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error :', error.message);
    }
  };
  const ingredientsIsIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };
  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white', flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar barStyle="light-content" />
      {/* Recipes Image */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={{uri: item.strMealThumb}}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp('98%'),
            height: hp('50%'),
            borderRadius: 33,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      {/* Back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          paddingHorizontal: 20,
          paddingTop: 20,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}>
            <Image
              style={{width: 27, height: 27}}
              source={require('../assets/images/back.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Image
              style={{width: 27, height: 27}}
              source={
                isFavorite
                  ? require('../assets/images/heart.png')
                  : require('../assets/images/heartLine.png')
              }
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* meal desciption */}
      {loading ? (
        <Loading size="large" style={{marginTop: 56}} />
      ) : (
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 32,
          }}>
          {/* name and area */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}
          style={{top: -10, marginBottom: 5}}>
            <Text
              style={{fontSize: hp(3), fontWeight: 'bold', color: '#4A5568'}}>
              {meal?.strMeal}
            </Text>
            <Text
              style={{fontSize: hp(2), fontWeight: '500', color: '#718096'}}>
              {meal?.strArea}
            </Text>
          </Animated.View>
          {/* misc */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
          style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View
              style={{
                borderRadius: 9999,
                backgroundColor: '#F6E05E',
                padding: 8,
              }}>
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6.5) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/clock.png')}
                  style={{
                    width: hp(4),
                    height: hp(4),
                    borderWidth: 2.5,
                    tintColor: '#525252',
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 2,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  35
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  Mins
                </Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 9999,
                backgroundColor: '#F6E05E',
                padding: 8,
              }}>
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6.5) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/user.png')}
                  style={{
                    width: hp(4),
                    height: hp(4),
                    borderWidth: 2.5,
                    tintColor: '#525252',
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 2,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  03
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  Servings
                </Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 9999,
                backgroundColor: '#F6E05E',
                padding: 8,
              }}>
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6.5) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/fire.png')}
                  style={{
                    width: hp(4),
                    height: hp(4),
                    borderWidth: 2.5,
                    tintColor: '#525252',
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 2,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  103
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  Cal
                </Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 9999,
                backgroundColor: '#F6E05E',
                padding: 8,
              }}>
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6.5) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/square.png')}
                  style={{
                    width: hp(4),
                    height: hp(4),
                    borderWidth: 2.5,
                    tintColor: '#525252',
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 2,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  Easy
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: '#4A5568',
                  }}>
                  Level
                </Text>
              </View>
            </View>
          </Animated.View>
          {/* ingredients */}
          <Animated.View  entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
           style={{marginTop: 20}}>
            <Text
              style={{fontSize: hp(2.5), fontWeight: 'bold', color: '#4A5568'}}>
              Ingredients
            </Text>
            <View style={{marginLeft: 10, marginTop: 5}}>
              {ingredientsIsIndexes(meal).map(i => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        height: hp(1.5),
                        width: hp(1.5),
                        backgroundColor: '#F6E05E',
                        borderRadius: hp(1.5) / 2,
                        marginTop: 7,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: '600',
                          color: 'black',
                          fontSize: 15,
                        }}>
                        {meal['strMeasure' + i]}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 6,
                          fontWeight: '400',
                          color: 'black',
                          fontSize: 15,
                        }}>
                        {meal['strIngredient' + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/*     Instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          style={{marginTop: 20}}>
            <Text
              style={{fontSize: hp(2.5), fontWeight: 'bold', color: '#4A5568'}}>
              Instructions
            </Text>
            <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>
          {/* recipes video */}
          {meal && meal.strYoutube && (
            <Animated.View  entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
            className="space-y-4">
              <Text
                style={{
                  fontSize: hp(2.5),
                  fontWeight: 'bold',
                  color: '#4A5568',
                }}>
                Recipe video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipesDetailScreen;

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
