import React, { useState } from 'react';
import { Image, Switch } from 'react-native';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SessionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import SocialLoginComponent from '../../components/SocialLoginComponent';

const LoginScreen = () => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}
      imageBackground={require('../../assets/images/loginLogo.png')}
    >
      {/* Body */}
      <SessionComponent padding={29} paddingTop={0}>
        <TextComponent
          text='Sign in'
          fontSize={24}
          fontFamily={fontFamilies.medium}
          color={appColors.black}
        />
        <SpaceComponent height={17} />
        <InputComponent
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your password'}
          allowClear={false}
          onChange={() => { }} />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={false}
          onChange={() => { }} />
        <RowComponent alignItems='center' justifyContent='space-between'>
          <RowComponent alignItems='center' justifyContent='flex-start'>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
            />
            <TextComponent color={isRememberMe ? appColors.black : undefined} text='Remember Me' />
          </RowComponent>
          <ButtonComponent onPress={() => { }} title={<TextComponent text='Fogot the password' />} />
        </RowComponent>
        <SpaceComponent height={17} />
        <ContainerComponent isCenter={true}>
          <ButtonComponent
            isDisable={false}
            type='primary'
            borderRadius={15}
            height={58}
            width={'85%'}
            backgroundColor={appColors.primary}
            onPress={() => { }}
            suffix={<Image source={require('../../assets/images/iconArrowRight.png')} />}
            title={<TextComponent color={appColors.white} fontSize={16} fontFamily={fontFamilies.medium} text='SIGN IN' />}

          />
        </ContainerComponent>
        <SpaceComponent height={10}/>
        <SocialLoginComponent />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
