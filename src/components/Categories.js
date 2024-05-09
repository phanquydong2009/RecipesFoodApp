import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Categories = ({ categories, activeCategory, handleChangeCategory, getRecipes }) => {
  useEffect(() => {
    getRecipes(activeCategory); // Gọi hàm getRecipes khi activeCategory thay đổi
  }, []); 
  // }, [activeCategory, getRecipes]); // Thêm getRecipes vào dependencies của useEffect

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {
          categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            let activeButtonStyle = isActive ? styles.activeButton : null;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={styles.categoryContainer}>
                <View style={[styles.categoryIconContainer, activeButtonStyle]}>
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={styles.categoryIcon}
                  />
                </View>
                <Text style={styles.categoryText}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}

      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 20
  },
  categoryIconContainer: {
    borderRadius: 999,
    padding: wp(1),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  categoryIcon: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    marginTop: 4,
    fontSize: hp(1.6),
    color: 'black',
  },
  activeButton: {
    backgroundColor: 'orange',
  },
});

export default Categories;
