import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SessionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import OTPInputComponent from '../../components/OTPInputComponent';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Verification} from '../../types/Verification';
import {SignUp} from '../../types/signUp';
import authenticationAPI from '../../apis/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../redux/Hooks';
import {addAuth} from '../../redux/Silce';
import {handleVerification} from '../../apis/callApi';

const initialValue: Verification[] = [
  {
    id: 1,
    value: '',
    isFocus: true,
  },
  {
    id: 2,
    value: '',
    isFocus: false,
  },
  {
    id: 3,
    value: '',
    isFocus: false,
  },
  {
    id: 4,
    value: '',
    isFocus: false,
  },
];

function checkAllFieldHaveValue(value: Verification[]): boolean {
  let allFieldsHaveValue = true;
  value.forEach(item => {
    if (item.value === '') {
      allFieldsHaveValue = false;
    }
  });
  return allFieldsHaveValue;
}

function getAllValueFromInput(value: Verification[]) {
  let code = '';
  value.forEach(item => {
    code = code + item.value;
  });
  return code;
}

interface Error {
  name: string;
  isError: boolean;
}

const VerificationScreen = ({navigation, route}: any) => {
  const {username, code, email, password} = route.params;
  // Constant
  const ERROR_TIMING =
    'Time out verification code, please resend new code to verification again!';
  const ERROR_CODE_NOT_MATCH = 'Code not match!';
  // CountDown
  const initialCount = 20;
  const [counter, setCounter] = useState(initialCount);
  // Other
  const [error, setError] = useState<Error>({
    name: '',
    isError: false,
  });
  // State
  const dispatch = useAppDispatch();
  const [signUpData, setSignUpData] = useState<SignUp>({
    username: username,
    email: email,
    password: password,
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [verification, setVerification] =
    useState<Verification[]>(initialValue);
  const [_code, _setCode] = useState(code);
  // Process
  const handleEntryCodeEvent = useCallback(
    (id: number, val: string) => {
      let validate = false;
      let isNotHaveValue = val.length === 0;
      const updatedVerification = verification.map(item => {
        if (item.id === id) {
          return {...item, value: val, isFocus: isNotHaveValue};
        } else if (item.id === id + 1 && !isNotHaveValue) {
          return {...item, isFocus: true};
        }
        return {...item, isFocus: false};
      });
      setVerification(updatedVerification);
      validate = checkAllFieldHaveValue(updatedVerification);
      setIsDisable(validate);
    },
    [verification, setVerification],
  );

  const handleVerificationActions = async () => {
    if (counter != 0) {
      const valueFromInput = getAllValueFromInput(verification);
      if (parseInt(valueFromInput) === _code) {
        setError({...error, isError: false});
        handleCallApi();
      } else {
        setError({name: ERROR_CODE_NOT_MATCH, isError: true});
      }
    } else {
      setError({name: ERROR_TIMING, isError: true});
    }
  };

  useEffect(() => {
    const flag = setInterval(() => {
      if (counter > 0) {
        setCounter(counter => counter - 1);
      } else {
        clearInterval(flag);
      }
    }, 1000);
    return () => clearInterval(flag);
  }, [counter]);

  const handleResendEmailVerification = async () => {
    setError({...error, isError: false});
    setCounter(initialCount);
    const signUpData: SignUp = {
      username: '',
      email: email,
      password: password,
      confirmPassword: '',
    };
    const res = await handleVerification(signUpData);
    _setCode(res?.data.code);
  };

  function deleteProperty(value: SignUp, propKey: keyof SignUp) {
    delete value[propKey];
  }

  const handleCallApi = async () => {
    setIsLoading(true);
    deleteProperty(signUpData, 'confirmPassword');
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/register',
        signUpData,
        'post',
      );

      if (Boolean(res)) {
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        await AsyncStorage.setItem(
          'save',
          JSON.stringify({
            email: res?.data.email,
            isRememberMe: false,
            password: null,
          }),
        );
        dispatch(addAuth(res.data));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

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
          onPress={() => navigation.goBack()}
          affix={
            <AntDesign name="arrowleft" size={30} color={appColors.black} />
          }
        />
        <TextComponent
          text="Verification"
          fontSize={24}
          fontFamily={fontFamilies.medium}
          color={appColors.black}
        />
        <SpaceComponent height={12} />
        <TextComponent
          text={`We’ve send you the verification code on ${'\n'} ${email}`}
          fontSize={15}
          fontFamily={fontFamilies.regular}
          color={appColors.black}
        />
        <SpaceComponent height={28} />
        <RowComponent justifyContent="space-around" alignItems="center">
          <OTPInputComponent
            id={verification[0].id}
            onChange={handleEntryCodeEvent}
            isFocus={verification[0].isFocus}
            code={verification[0].value}
          />
          <OTPInputComponent
            id={verification[1].id}
            onChange={handleEntryCodeEvent}
            isFocus={verification[1].isFocus}
            code={verification[1].value}
          />
          <OTPInputComponent
            id={verification[2].id}
            onChange={handleEntryCodeEvent}
            isFocus={verification[2].isFocus}
            code={verification[2].value}
          />
          <OTPInputComponent
            id={verification[3].id}
            onChange={handleEntryCodeEvent}
            isFocus={verification[3].isFocus}
            code={verification[3].value}
          />
        </RowComponent>
        <SpaceComponent height={9} />
        {error.isError && (
          <TextComponent text={error.name} color={appColors.red} />
        )}
        <SpaceComponent height={30} />
        <ButtonComponent
          alignSelf="center"
          isDisable={!isDisable}
          type="primary"
          borderRadius={15}
          height={58}
          width={'85%'}
          backgroundColor={appColors.primary}
          onPress={handleVerificationActions}
          suffix={
            <Image source={require('../../assets/images/iconArrowRight.png')} />
          }
          title={
            <TextComponent
              color={appColors.white}
              fontSize={16}
              fontFamily={fontFamilies.medium}
              text="send"
              upperCase={true}
            />
          }
        />
        <SpaceComponent height={24} />
        <RowComponent justifyContent="center" alignItems="center">
          {counter > 0 ? (
            <>
              <TextComponent
                text="Re-send code in"
                color={appColors.black}
                fontFamily={fontFamilies.regular}
              />
              <TextComponent
                text={' ' + `0:${counter}`}
                color={appColors.primary}
                fontFamily={fontFamilies.regular}
              />
            </>
          ) : (
            <ButtonComponent
              onPress={handleResendEmailVerification}
              title={<TextComponent text="Resend email verification" />}
            />
          )}
        </RowComponent>
      </SessionComponent>
    </ContainerComponent>
  );
};

export default VerificationScreen;
