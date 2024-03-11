import React from 'react';
import {Image} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SessionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import SocialLoginComponent from '../../components/SocialLoginComponent';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignUpScreen = ({navigation}: any) => {
  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}>
      {/* Body */}
      <SessionComponent padding={29} paddingTop={0}>
        <ButtonComponent
          marginVertical={10}
          alignSelf="flex-start"
          onPress={() => {}}
          affix={
            <AntDesign name="arrowleft" size={30} color={appColors.black} />
          }
        />
        <TextComponent
          text="Sign up"
          fontSize={24}
          fontFamily={fontFamilies.medium}
          color={appColors.black}
        />
        <SpaceComponent height={17} />
        <InputComponent
          affix={
            <Image
              style={{width: 22, height: 22}}
              source={require('../../assets/images/Profile.png')}
            />
          }
          placeholder={'Full name'}
          allowClear={false}
          onChange={val => {}}
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => {}}
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => {}}
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Confirm password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => {}}
          marginBottom={0}
        />
        <ContainerComponent isCenter={true}>
          <ButtonComponent
            marginVertical={25}
            isDisable={false}
            type="primary"
            borderRadius={15}
            height={58}
            width={'85%'}
            backgroundColor={appColors.primary}
            onPress={() => {}}
            suffix={
              <Image
                source={require('../../assets/images/iconArrowRight.png')}
              />
            }
            title={
              <TextComponent
                color={appColors.white}
                fontSize={16}
                fontFamily={fontFamilies.medium}
                text="Sign up"
                upperCase={true}
              />
            }
          />
        </ContainerComponent>
        <SocialLoginComponent navigation={navigation} type="sign_up" />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
