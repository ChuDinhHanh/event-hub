import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import AppRouters from './src/navigators/AppRouters';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('assetToken');

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
