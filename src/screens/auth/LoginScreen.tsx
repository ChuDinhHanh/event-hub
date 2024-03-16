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
import TextValidate from '../../components/TextValidate';
import {appColors} from '../../constants/appColors';
import {appScreens} from '../../constants/appScreens';
import {fontFamilies} from '../../constants/fontFamilies';
import {InputTextValidate, Validator} from '../../utils/Validate';
import authenticationAPI from '../../apis/authApi';
import Loading from '../../modals/Loading';

const initialValue = {
  email: '',
  password: '',
  isRememberMe: true,
};

interface Validate {
  email: InputTextValidate;
  password: InputTextValidate;
}

function checkAllFieldValidate(data: Validate): boolean {
  let key: keyof Validate;
  for (key in data) {
    if (data[key].isError) {
      return false;
    }
  }
  return true;
}

const ERROR_MESSAGES = {
  emailRequired: 'Email không được để trống',
  emailFormat: 'Email không đúng định dạng',
  passwordRequired: 'Mật khẩu không được để trống',
  passwordSpecialChar: 'Mật khẩu không được chứa các ký tự đặc biệt',
  passwordLength: 'Mật khẩu từ 6 ký tự trở lên',
  passwordMinLength: 'độ dài mật khẩu tối thiểu là 6 tối đa là 30',
};

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(initialValue);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loginValidate, setLoginValidate] = useState<Validate>({
    email: {
      textError: ERROR_MESSAGES.emailRequired,
      visible: false,
      isError: true,
    },
    password: {
      textError: ERROR_MESSAGES.emailRequired,
      visible: false,
      isError: true,
    },
  });

  // Validation functions
  function validateEmail(email: string): string {
    if (Validator.isBlank(email)) {
      return ERROR_MESSAGES.emailRequired;
    } else if (!Validator.isEmail(email)) {
      return ERROR_MESSAGES.emailFormat;
    }
    return '';
  }

  function validatePassword(password: string): string {
    if (Validator.isBlank(password)) {
      return ERROR_MESSAGES.passwordRequired;
    } else if (!Validator.isNotSpecialCharacter(password)) {
      return ERROR_MESSAGES.passwordSpecialChar;
    } else if (Validator.isInsideLimitedLength(password, 1, 5)) {
      return ERROR_MESSAGES.passwordLength;
    } else if (!Validator.isInsideLimitedLength(password, 6, 30)) {
      return ERROR_MESSAGES.passwordMinLength;
    }
    return '';
  }

  // In your component
  const handleOnTextChangeEvent = (key: string, val: string | boolean) => {
    const data: any = {...loginData, [key]: val};
    setLoginData(data);
    handleValidateActions(key, val);
  };

  const handleValidateActions = (key: string, val: any) => {
    let error = '';
    switch (key) {
      case 'email':
        error = validateEmail(val);
        break;
      case 'password':
        error = validatePassword(val);
        break;
      default:
        break;
    }
    setLoginValidate(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof Validate],
        textError: error,
        isError: !!error,
      },
    }));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleForgotThePassword = () => {
    navigation.navigate(appScreens.VERIFICATION_SCREEN);
  };

  const handleShowError = () => {
    const updatedLoginValidate = {...loginValidate};
    let key: keyof Validate;
    for (key in updatedLoginValidate) {
      if (updatedLoginValidate[key].isError) {
        updatedLoginValidate[key].visible = true;
      } else {
        updatedLoginValidate[key].visible = false;
      }
    }
    setLoginValidate(updatedLoginValidate);
  };

  const handleCallLoginApi = async () => {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/register',
        loginData,
        'post',
      );
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    const result = checkAllFieldValidate(loginValidate);
    if (result) {
      handleCallLoginApi();
    } else {
      handleShowError();
      setIsFirstTime(false);
    }
  };

  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}
      imageBackground={require('../../assets/images/loginLogo.png')}>
      {/* Loading */}
      <Loading visible={isLoading} />
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
          title="Email"
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => handleOnTextChangeEvent('email', val)}
          isError={isFirstTime ? undefined : loginValidate.email.isError}
          validate={
            <TextValidate
              visible={loginValidate.email.visible}
              text={loginValidate.email.textError}
            />
          }
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => handleOnTextChangeEvent('password', val)}
          isError={isFirstTime ? undefined : loginValidate.password.isError}
          validate={
            <TextValidate
              visible={loginValidate.password.visible}
              text={loginValidate.password.textError}
            />
          }
        />
        <RowComponent alignItems="center" justifyContent="space-between">
          <RowComponent alignItems="center" justifyContent="flex-start">
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={loginData.isRememberMe}
              onChange={() =>
                handleOnTextChangeEvent('isRememberMe', !loginData.isRememberMe)
              }
            />
            <TextComponent
              color={loginData.isRememberMe ? appColors.black : undefined}
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
