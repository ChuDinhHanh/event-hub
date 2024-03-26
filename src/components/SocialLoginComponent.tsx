import React from 'react';
import {Image} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import ButtonComponent from './ButtonComponent';
import ContainerComponent from './ContainerComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {appScreens} from '../constants/appScreens';
import {useNavigation} from '@react-navigation/native';

interface Props {
  isLogin: boolean;
  navigation: any;
}
const SocialLoginComponent = (props: Props) => {
  const {isLogin, navigation} = props;
  return (
    <ContainerComponent isCenter={true}>
      <TextComponent text="OR" fontSize={16} fontFamily={fontFamilies.medium} />
      <SpaceComponent height={10} />
      <ButtonComponent
        spacePrevious={20}
        boxShadow={true}
        backgroundColor={appColors.white}
        width={'85%'}
        borderRadius={15}
        height={56}
        onPress={() => {}}
        affix={<Image source={require('../assets/images/Google.png')} />}
        type="primary"
        title={
          <TextComponent
            color={appColors.black}
            fontFamily={fontFamilies.regular}
            text="Login with Google"
            fontSize={16}
          />
        }
      />
      <SpaceComponent height={17} />
      <ButtonComponent
        boxShadow={true}
        spacePrevious={20}
        backgroundColor={appColors.white}
        width={'85%'}
        borderRadius={15}
        height={56}
        onPress={() => {}}
        type="primary"
        affix={<Image source={require('../assets/images/Facebook.png')} />}
        title={
          <TextComponent
            color={appColors.black}
            fontFamily={fontFamilies.regular}
            text="Login with Facebook"
            fontSize={16}
          />
        }
      />
      <SpaceComponent height={15} />
      <RowComponent justifyContent="center" alignItems="center">
        <TextComponent
          fontSize={15}
          fontFamily={fontFamilies.regular}
          color={appColors.black}
          text={isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        />
        <SpaceComponent width={10} />
        <ButtonComponent
          onPress={() => {
            isLogin
              ? navigation.navigate(appScreens.SIGN_UP_SCREEN)
              : navigation.goBack();
          }}
          title={
            <TextComponent
              fontSize={15}
              fontFamily={fontFamilies.regular}
              color={appColors.primary}
              text={isLogin ? 'Sign up' : 'Sign in'}
            />
          }
        />
      </RowComponent>
    </ContainerComponent>
  );
};

export default SocialLoginComponent;
