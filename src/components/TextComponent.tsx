import React from 'react';
import {FlexAlignType, Text} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  fontFamily?: string;
  fontSize?: number;
  text: string;
  color?: string;
  textAlign?: 'center' | undefined;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  isTitle?: boolean;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  upperCase?: boolean;
  marginBottom?: number;
}

const TextComponent = (props: Props) => {
  const {
    color,
    fontFamily,
    fontSize,
    text,
    alignSelf,
    textAlign,
    fontWeight,
    isTitle,
    upperCase,
    marginBottom,
  } = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color,
          fontFamily: isTitle ? fontFamilies.bold : fontFamily,
          fontSize,
          alignSelf,
          textAlign,
          fontWeight,
          textTransform: upperCase ? 'uppercase' : undefined,
          marginBottom,
        },
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
