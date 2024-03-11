import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import ContainerComponent from '../ContainerComponent';
import SessionComponent from '../SessionComponent';
import SpaceComponent from '../SpaceComponent';
import TextComponent from '../TextComponent';

interface Props {
  title: string;
  content: string;
  image: any;
}

const OnboardingItemComponent = (props: Props) => {
  const {content, image, title} = props;
  return (
    <ContainerComponent isCenter={true} isFullHeight={true} isFullWidth={true}>
      <Image source={image} />
      <SpaceComponent height={100} />
      <View
        style={{
          width: appInfo.sizes.WIDTH,
          height: appInfo.sizes.HEIGHT * 0.3,
          bottom: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          backgroundColor: appColors.primary,
        }}>
        {/* Title */}
        <SessionComponent>
          <TextComponent
            fontWeight="bold"
            textAlign="center"
            color={appColors.white}
            fontSize={20}
            alignSelf="center"
            text={title}
          />
          <SpaceComponent height={10} />
          {/* Content */}
          <TextComponent
            color={appColors.white}
            textAlign="center"
            alignSelf="center"
            text={content}
          />
        </SessionComponent>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({});
export default OnboardingItemComponent;
