import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useAppDispatch} from '../../redux/Hooks';
import {removeAuth} from '../../redux/Silce';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    console.log('====================================');
    AsyncStorage.setItem('auth', '');
    dispatch(removeAuth());
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Log out" onPress={() => handleLogout()} />
    </View>
  );
};

export default HomeScreen;
