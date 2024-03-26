import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, SplashScreen} from '../screens';
import {appScreens} from '../constants/appScreens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={appScreens.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
