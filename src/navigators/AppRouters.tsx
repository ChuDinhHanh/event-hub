import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { addAuth } from '../redux/Silce';
import IntroduceNavigator from './IntroduceNavigator';
import MainNavigator from './MainNavigator';
import { appScreens } from '../constants/appScreens';
import { Header } from 'react-native/Libraries/NewAppScreen';
import AuthNavigator from './AuthNavigator';

export type RootStackParamList = {
  ONBOARDING_SCREEN: undefined;
  SPLASH_SCREEN: undefined;
  LOGIN_SCREEN: undefined;
  HOME_SCREEN: undefined;
  SIGN_UP_SCREEN: undefined;
  VERIFICATION_SCREEN: undefined;
  AUTH_NAVIGATOR: undefined;
  INTRODUCE_NAVIGATOR: undefined;
  MAIN_NAVIGATOR: undefined;
  TAB_NAVIGATOR: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppRouters = () => {
  const auth = useAppSelector(state => state.auth.authData);
  const { getItem } = useAsyncStorage('auth');
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    res && (await dispatch(addAuth(JSON.parse(res as any))));
    // console.log('================RootStackParamList====================');
    // console.log(JSON.stringify(res), auth);
    // console.log('====================================');
  };

  const screen1 = appScreens.MAIN_NAVIGATOR as keyof RootStackParamList;
  const screen2 = appScreens.INTRODUCE_NAVIGATOR as keyof RootStackParamList;

  console.log(
    ' ----------------------' +
    Boolean(auth.accessToken) +
    ' ----------------------',
  );

  const mainFunc = () => {
    return (
      <RootStack.Screen
        name={appScreens.MAIN_NAVIGATOR as keyof RootStackParamList}
        component={MainNavigator}
        options={{ header: () => false }}
      />
    );
  };

  const introFunc = () => {
    return (
      <RootStack.Screen
        name={appScreens.INTRODUCE_NAVIGATOR as keyof RootStackParamList}
        component={IntroduceNavigator}
        options={{ header: () => false }}
      />
    );
  };

  const authFunc = () => {
    return (
      <RootStack.Screen
        name={appScreens.AUTH_NAVIGATOR as keyof RootStackParamList}
        component={AuthNavigator}
        options={{ header: () => false }}
      />
    );
  };

  // return (
  //     <RootStack.Navigator
  //         initialRouteName={Boolean(auth.accessToken) ? screen1 : screen2}>
  //         {mainFunc()}
  //         {introFunc()}
  //         {authFunc()}
  //     </RootStack.Navigator>
  // );

  // return Boolean(auth.accessToken) ? <MainNavigator/>:<IntroduceNavigator/>

  console.log('====================================');
  console.log(JSON.stringify(auth));
  console.log('====================================');
  return Boolean(auth.accessToken) ? <MainNavigator /> : <AuthNavigator />;
};

export default AppRouters;
