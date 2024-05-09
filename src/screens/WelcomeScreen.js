import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const ring1padding = new Animated.Value(0);
  const ring2padding = new Animated.Value(0);

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(ring1padding, {
      toValue: hp(5),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(ring2padding, {
      toValue: hp(5.5),
      duration: 600,
      useNativeDriver: false,
    }).start();
    
    setTimeout(() => navigation.navigate('Home'), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      {/* logo image with ring */}
      <Animated.View style={[styles.ringContainer, { padding: ring1padding }]}>
        <Animated.View style={[styles.ringContainer, { padding: ring2padding }]}>
          <Image source={require('../assets/images/food.png')} style={styles.logo} />
        </Animated.View>
      </Animated.View>
      {/* title and punchline */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Foody</Text>
        <Text style={styles.subtitleText}>Food is always right!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBF00',
  },
  ringContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 9999, 
    padding: 10,
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  titleText: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: wp(0.5),
  },
  subtitleText: {
    fontSize: hp(2),
    fontWeight: '500', 
    color: 'white',
    letterSpacing: wp(0.5),
  },
});

export default WelcomeScreen;
