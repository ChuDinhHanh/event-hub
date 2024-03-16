import React, {ReactNode} from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';
import RowComponent from './RowComponent';

interface Props {
  isScrollEnable?: boolean;
  isCenter?: boolean;
  backgroundColor?: string;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  children: ReactNode;
  paddingVertical?: number;
  showsScrollIndicator?: boolean;
  imageBackground?: ImageSourcePropType | undefined;
}
const ContainerComponent = (props: Props) => {
  const {
    backgroundColor,
    isCenter,
    isFullHeight,
    isFullWidth,
    children,
    paddingVertical,
    isScrollEnable,
    showsScrollIndicator,
    imageBackground,
  } = props;

  const content = (
    <SafeAreaView
      style={{
        paddingVertical,
        backgroundColor: backgroundColor ?? appColors.white,
        justifyContent: isCenter ? 'center' : undefined,
        alignItems: isCenter ? 'center' : undefined,
        height: isFullHeight ? appInfo.sizes.HEIGHT : undefined,
        width: isFullWidth ? appInfo.sizes.WIDTH : undefined,
      }}>
      {children}
    </SafeAreaView>
  );

  return (
    <React.Fragment>
      {isScrollEnable ? (
        <ScrollView
          style={{backgroundColor: backgroundColor ?? appColors.white}}
          showsVerticalScrollIndicator={showsScrollIndicator}>
          <View>
            {imageBackground && (
              <RowComponent
                marginVertical={20}
                alignItems="center"
                justifyContent="center">
                <Image source={imageBackground} />
              </RowComponent>
            )}
            {content}
          </View>
        </ScrollView>
      ) : (
        content
      )}
    </React.Fragment>
  );
};

export default ContainerComponent;
