import React, {useState} from 'react';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SessionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {ERROR_MESSAGES} from '../../languages/vietnamese.json';
import {Validator} from '../../utils/Validate';
import TextValidate from '../../components/TextValidate';
import authenticationAPI from '../../apis/authApi';
import Loading from '../../modals/Loading';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    title: '',
    isError: false,
  });
  const [isDisable, setIsDisable] = useState(true);

  function validateEmail(email: string): string {
    if (Validator.isBlank(email)) {
      return ERROR_MESSAGES.emailRequired;
    } else if (!Validator.isEmail(email)) {
      return ERROR_MESSAGES.emailFormat;
    }
    return '';
  }

  const handleValidateData = () => {
    const value = validateEmail(email);
    setError({title: value, isError: Boolean(value)});
    setIsDisable(Boolean(value));
  };

  const handleSubmitEvent = () => {
    handleCallLoginApi();
  };

  const handleCallLoginApi = async () => {
    setIsLoading(true);
    let response = null;
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/forgotPassword',
        {email: email},
        'post',
      );
      setIsLoading(false);
      response = res;
    } catch (error) {
      setIsLoading(false);
    }
    return response;
  };

  return (
    <ContainerComponent
      showsScrollIndicator={false}
      isScrollEnable={true}
      backgroundColor={appColors.white}
      isCenter={false}>
      <Loading visible={isLoading} />
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
          text="Resset Password"
          fontSize={24}
          fontFamily={fontFamilies.medium}
          color={appColors.black}
        />
        <SpaceComponent height={12} />
        <TextComponent
          text={`Please enter your email address to${'\n'}request a password reset`}
          fontSize={15}
          fontFamily={fontFamilies.regular}
          color={appColors.black}
        />
        <SpaceComponent height={26} />
        <InputComponent
          onEnd={handleValidateData}
          isFocus={true}
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => setEmail(val)}
          validate={<TextValidate visible={error.isError} text={error.title} />}
        />
        <SpaceComponent height={40} />
        <ButtonComponent
          alignSelf="center"
          isDisable={isDisable}
          type="primary"
          borderRadius={15}
          height={58}
          width={'85%'}
          backgroundColor={appColors.primary}
          onPress={() => handleSubmitEvent()}
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
      </SessionComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
