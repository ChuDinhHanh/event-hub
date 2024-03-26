import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, SignUpScreen, ForgotPasswordScreen} from '../screens';
import OnBoardingScreen from '../screens/auth/OnboardingScreen';
import {appScreens} from '../constants/appScreens';
import VerificationScreen from '../screens/auth/VerificationScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={appScreens.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={appScreens.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={appScreens.VERIFICATION_SCREEN}
        component={VerificationScreen}
      />
      <Stack.Screen
        name={appScreens.ONBOARDING_SCREEN}
        component={OnBoardingScreen}
      />
      <Stack.Screen name={appScreens.SIGN_UP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
