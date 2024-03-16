import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';

const SplashScreen = () => {
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
