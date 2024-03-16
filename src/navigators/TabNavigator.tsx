import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens';
import {appScreens} from '../constants/appScreens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={appScreens.HOME_SCREEN} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
