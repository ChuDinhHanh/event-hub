import React, {useEffect, useState} from 'react';
import {Image, Switch} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SessionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import SocialLoginComponent from '../../components/SocialLoginComponent';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';

const initialValue = {
  email: '',
  password: '',
  isRememberMe: true,
};
const LoginScreen = ({navigation}: any) => {
  const [loginData, setLoginData] = useState(initialValue);
  const [email, setEmail] = useState(loginData.email);
  const [password, setPassword] = useState(loginData.email);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(
    loginData.isRememberMe,
  );
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const handleForgotThePassword = () => {
    console.log('handleForgotThePassword');
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
      isRememberMe: isRememberMe,
    };
    console.log('====================================');
    console.log(JSON.stringify(data));
    console.log('====================================');
  };

  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}
      imageBackground={require('../../assets/images/loginLogo.png')}>
      {/* Body */}
      <SessionComponent padding={29} paddingTop={0}>
        <TextComponent
          text="Sign in"
          fontSize={24}
          fontFamily={fontFamilies.medium}
          color={appColors.black}
        />
        <SpaceComponent height={17} />
        <InputComponent
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => setEmail(val)}
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => setPassword(val)}
        />
        <RowComponent alignItems="center" justifyContent="space-between">
          <RowComponent alignItems="center" justifyContent="flex-start">
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
            />
            <TextComponent
              color={isRememberMe ? appColors.black : undefined}
              text="Remember Me"
            />
          </RowComponent>
          <ButtonComponent
            onPress={() => handleForgotThePassword()}
            title={<TextComponent text="Fogot the password" />}
          />
        </RowComponent>
        <SpaceComponent height={17} />
        <ContainerComponent isCenter={true}>
          <ButtonComponent
            isDisable={false}
            type="primary"
            borderRadius={15}
            height={58}
            width={'85%'}
            backgroundColor={appColors.primary}
            onPress={() => handleLogin()}
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
                text="Sign In"
                upperCase={true}
              />
            }
          />
        </ContainerComponent>
        <SpaceComponent height={10} />
        <SocialLoginComponent navigation={navigation} type="Sign_in" />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
