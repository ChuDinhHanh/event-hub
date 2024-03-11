import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from './src/navigators/AuthNavigator';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import {StatusBar} from 'react-native';
import {appColors} from './src/constants/appColors';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  };

  return (
    <React.Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={appColors.white} />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </React.Fragment>
  );
};

export default App;
