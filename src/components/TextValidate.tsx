import React from 'react';
import {StyleProp, View, ViewProps} from 'react-native';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColors';

interface Props {
  text: string | null;
  style?: StyleProp<ViewProps>;
  visible: boolean;
}

const TextValidate = (props: Props) => {
  const {text, style, visible} = props;
  return (
    <View style={style}>
      {Boolean(text) && visible && (
        <TextComponent
          text={text ?? ''}
          color={Boolean(text) ? appColors.red : undefined}
        />
      )}
    </View>
  );
};

export default TextValidate;
