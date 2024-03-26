import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {Image, LogBox, Switch, TextInput} from 'react-native';
import authenticationAPI from '../../apis/authApi';
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
import {ERROR_MESSAGES} from '../../languages/vietnamese.json';
import Loading from '../../modals/Loading';
import {RootStackParamList} from '../../navigators/AppRouters';
import {useAppDispatch} from '../../redux/Hooks';
import {addAuth} from '../../redux/Silce';
import {InputTextValidate, Validator} from '../../utils/Validate';
import {loginType} from '../../types/Login';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const initialValue: loginType = {
  email: '',
  password: '',
  isRememberMe: false,
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

const LoginScreen = ({navigation}: any) => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<loginType>(initialValue);
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

  const handleOnTextChangeEvent = (key: string, val: string | boolean) => {
    const data: any = {...loginData, [key]: val};
    setLoginData(data);
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

  const handleGetDataFromLocal = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('save')
        .then(data => {
          if (data) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error('data not found!'));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const handleForgotThePassword = () => {
    navigation.navigate(appScreens.FORGOT_PASSWORD_SCREEN);
    // navigation.replace(
    //   appScreens.VERIFICATION_SCREEN as keyof RootStackParamList,
    // );
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
    let response = null;
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        loginData,
        'post',
      );
      setIsLoading(false);
      response = res;
    } catch (error) {
      setIsLoading(false);
    }
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await handleGetDataFromLocal()) as loginType;
        setLoginData(data);
        if (isFirstTime) {
          handleValidateActions('email', data.email);
          handleValidateActions('password', data.password);
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [isFocus]);

  const handleLogin = async () => {
    const result = checkAllFieldValidate(loginValidate);
    if (result) {
      const res = await handleCallLoginApi();
      dispatch(addAuth(res?.data));
      // Save auth data
      await AsyncStorage.setItem('auth', JSON.stringify(res?.data));
      // Save data to login again
      await AsyncStorage.setItem(
        'save',
        JSON.stringify({
          email: res?.data.email,
          isRememberMe: loginData.isRememberMe,
          password: loginData.isRememberMe ? loginData.password : null,
        }),
      );
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
          inputRef={emailRef}
          value={loginData.email}
          title="Email"
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => handleOnTextChangeEvent('email', val)}
          onEnd={() => handleValidateActions('email', loginData.email)}
          isError={isFirstTime ? undefined : loginValidate.email.isError}
          validate={
            <TextValidate
              visible={loginValidate.email.visible}
              text={loginValidate.email.textError}
            />
          }
        />
        <InputComponent
          inputRef={passwordRef}
          value={loginData.password}
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => handleOnTextChangeEvent('password', val)}
          isError={isFirstTime ? undefined : loginValidate.password.isError}
          onEnd={() => handleValidateActions('password', loginData.password)}
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
        <SocialLoginComponent navigation={navigation} isLogin={true} />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
