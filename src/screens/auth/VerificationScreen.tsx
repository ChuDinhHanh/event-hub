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

const VerificationScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
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
          isFocus={true}
          affix={<Image source={require('../../assets/images/Mail.png')} />}
          placeholder={'Enter your email'}
          allowClear={false}
          onChange={val => setEmail(val)}
        />
        <SpaceComponent height={40} />
        <ButtonComponent
          alignSelf="center"
          isDisable={false}
          type="primary"
          borderRadius={15}
          height={58}
          width={'85%'}
          backgroundColor={appColors.primary}
          onPress={() => {}}
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

export default VerificationScreen;
