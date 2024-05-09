import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipesDetailScreen from '../screens/RecipesDetailScreen';

const Stack = createStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='RecipesDetail' component={RecipesDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
