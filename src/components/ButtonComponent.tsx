import React, {ReactNode} from 'react';
import {
  DimensionValue,
  FlexAlignType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import {appColors} from '../constants/appColors';

interface Props {
  title?: ReactNode;
  affix?: ReactNode;
  suffix?: ReactNode;
  spacePrevious?: number;
  spaceBehind?: number;
  onPress: () => void;
  backgroundColor?: string;
  width?: DimensionValue;
  marginVertical?: number;
  height?: DimensionValue;
  borderRadius?: number;
  type?: 'primary' | 'normal';
  isDisable?: boolean;
  boxShadow?: boolean;
  alignSelf?: 'auto' | FlexAlignType | undefined;
}
const ButtonComponent = (props: Props) => {
  const {
    width,
    suffix,
    affix,
    spaceBehind,
    spacePrevious,
    title,
    onPress,
    backgroundColor,
    height,
    marginVertical,
    borderRadius,
    type,
    isDisable,
    boxShadow,
    alignSelf,
  } = props;

  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={() => onPress()}
      style={[
        globalStyles.row,
        boxShadow && globalStyles.shadow,
        styles.wrapper_content,
        {
          backgroundColor: isDisable ? appColors.gray2 : backgroundColor,
          width: width ?? 'auto',
          height: height ?? 'auto',
          borderRadius,
          marginVertical,
          alignSelf,
        },
      ]}>
      {affix}
      <SpaceComponent width={spacePrevious ?? 0} />
      {title}
      <SpaceComponent width={spaceBehind ?? 0} />
      {type && type === 'primary' ? (
        <View style={{position: 'absolute', right: 14}}>{suffix}</View>
      ) : (
        suffix
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ButtonComponent;
