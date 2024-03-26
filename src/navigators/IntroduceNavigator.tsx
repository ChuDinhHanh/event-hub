import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {appScreens} from '../constants/appScreens';
import {OnboardingScreen, SplashScreen} from '../screens';

const IntroduceNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={appScreens.SPLASH_SCREEN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={appScreens.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen
        name={appScreens.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default IntroduceNavigator;
