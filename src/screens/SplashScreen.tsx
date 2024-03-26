import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/AppRouters';
import {appScreens} from '../constants/appScreens';

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.replace(
        appScreens.ONBOARDING_SCREEN as keyof RootStackParamList,
      );
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* Image */}
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
      {/* activity */}
      <View style={styles.wrapperActivity}>
        <ActivityIndicator size={40} color={appColors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: appInfo.sizes.WIDTH * 0.7,
  },
  wrapperActivity: {
    position: 'absolute',
    top: appInfo.sizes.HEIGHT * 0.6,
  },
});
export default SplashScreen;
