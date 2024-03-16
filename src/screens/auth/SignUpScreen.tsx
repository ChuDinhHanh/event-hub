import React, {useState} from 'react';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SessionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import SocialLoginComponent from '../../components/SocialLoginComponent';
import TextValidate from '../../components/TextValidate';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import Loading from '../../modals/Loading';
import {InputTextValidate, Validator} from '../../utils/Validate';

const initialValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface Validate {
  username: InputTextValidate;
  email: InputTextValidate;
  password: InputTextValidate;
  confirmPassword: InputTextValidate;
}

function checkAllFieldValidator(data: Validate): boolean {
  let key: keyof Validate;
  for (key in data) {
    if (data[key].isError) return false;
  }
  return true;
}

const ERROR_MESSAGES = {
  userNameRequired: 'Tên không được để trống',
  userNameLength: 'Tên có độ dài tối thiểu là 6 tối đa là 30',
  usernameSpecialChar: 'Tên không được chứa các ký tự đặc biệt',
  // #1
  emailRequired: 'Email không được để trống',
  emailFormat: 'Email không đúng định dạng',
  // #2
  passwordRequired: 'Mật khẩu không được để trống',
  passwordSpecialChar: 'Mật khẩu không được chứa các ký tự đặc biệt',
  passwordLength: 'Mật khẩu từ 6 ký tự trở lên',
  passwordMinLength: 'Độ dài mật khẩu tối thiểu là 6 tối đa là 30',
  // #3
  confirmPasswordNotMatch: 'Mật khẩu không giống nhau',
  confirmPasswordRequire: 'Mật khẩu xác nhận không được để trống',
};

const SignUpScreen = ({navigation}: any) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [values, setValues] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpValidate, setSignUpValidate] = useState<Validate>({
    username: {
      textError: ERROR_MESSAGES.userNameRequired,
      isError: true,
      visible: false,
    },
    email: {
      textError: ERROR_MESSAGES.emailRequired,
      isError: true,
      visible: false,
    },
    password: {
      textError: ERROR_MESSAGES.passwordRequired,
      isError: true,
      visible: false,
    },
    confirmPassword: {
      textError: ERROR_MESSAGES.confirmPasswordRequire,
      isError: true,
      visible: false,
    },
  });

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values, [key]: value};
    setValues(data);
    handleValidateActions(key, value);
  };

  // Validation functions
  function validateUsername(username: string): string {
    if (Validator.isBlank(username)) {
      return ERROR_MESSAGES.userNameRequired;
    } else if (!Validator.isNotSpecialCharacter(username)) {
      return ERROR_MESSAGES.usernameSpecialChar;
    } else if (!Validator.isInsideLimitedLength(username, 6, 30)) {
      return ERROR_MESSAGES.userNameLength;
    }
    return '';
  }

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

  function validatePasswordConfirm(
    password: string,
    passwordConfirm: string,
  ): string {
    if (Validator.isBlank(passwordConfirm)) {
      return ERROR_MESSAGES.confirmPasswordRequire;
    } else if (password != passwordConfirm) {
      return ERROR_MESSAGES.confirmPasswordNotMatch;
    }
    return '';
  }

  const handleValidateActions = (key: string, value: string) => {
    let error = '';
    switch (key) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validatePasswordConfirm(values.password, value);
        break;
      default:
        break;
    }
    setSignUpValidate(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof Validate],
        textError: error,
        isError: !!error,
      },
    }));
  };

  const handleShowError = () => {
    let key: keyof Validate;
    for (key in signUpValidate) {
      if (signUpValidate[key].isError) {
        signUpValidate[key].visible = true;
      } else {
        signUpValidate[key].visible = false;
      }
    }
  };

  const handleCallApi = async () => {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/register',
        values,
        'post',
      );
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    isFirstTime && setIsFirstTime(false);
    if (checkAllFieldValidator(signUpValidate)) {
      handleCallApi();
    } else {
      handleShowError();
    }
  };

  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}>
      <Loading visible={isLoading} messenger="Loading" />
      {/* Body */}
      <SessionComponent padding={29} paddingTop={0}>
        <ButtonComponent
          marginVertical={10}
          alignSelf="flex-start"
          onPress={() => {
            navigation.goBack();
          }}
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
          onChange={val => handleChangeValue('username', val)}
          isError={isFirstTime ? undefined : signUpValidate.username.isError}
          validate={
            <TextValidate
              visible={signUpValidate.username.visible}
              text={signUpValidate.username.textError}
            />
          }
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => handleChangeValue('email', val)}
          isError={isFirstTime ? undefined : signUpValidate.email.isError}
          validate={
            <TextValidate
              visible={signUpValidate.email.visible}
              text={signUpValidate.email.textError}
            />
          }
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Enter your password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => handleChangeValue('password', val)}
          isError={isFirstTime ? undefined : signUpValidate.password.isError}
          onBlur={() => {
            values.confirmPassword.length !== 0 &&
              handleChangeValue('confirmPassword', values.confirmPassword);
          }}
          validate={
            <TextValidate
              visible={signUpValidate.password.visible}
              text={signUpValidate.password.textError}
            />
          }
        />
        <InputComponent
          affix={<Image source={require('../../assets/images/Password.png')} />}
          placeholder={'Confirm password'}
          isShowPass={true}
          allowClear={true}
          onChange={val => handleChangeValue('confirmPassword', val)}
          marginBottom={0}
          isError={
            isFirstTime ? undefined : signUpValidate.confirmPassword.isError
          }
          validate={
            <TextValidate
              visible={signUpValidate.confirmPassword.visible}
              text={signUpValidate.confirmPassword.textError}
            />
          }
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
            onPress={() => handleSignUp()}
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
