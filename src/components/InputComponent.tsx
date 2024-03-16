import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {appColors} from '../constants/appColors';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  value?: string;
  affix?: ReactNode;
  suffix?: ReactNode;
  onChange: (val: string) => void;
  isShowPass?: boolean;
  allowClear: boolean;
  type?: KeyboardType;
  placeholder?: string;
  onEnd?: () => void;
  marginBottom?: number;
  isFocus?: boolean;
  title?: string;
  multiline?: boolean;
  numberLine?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  defaultValue?: string;
  textInputRef?: React.LegacyRef<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  validate?: ReactNode;
  isError?: boolean;
}
const InputComponent = (props: Props) => {
  const {
    allowClear,
    isShowPass,
    placeholder,
    affix,
    onChange,
    onEnd,
    suffix,
    type,
    value,
    marginBottom,
    isFocus,
    defaultValue,
    keyboardType,
    multiline,
    numberLine,
    onBlur,
    onFocus,
    textInputRef,
    title,
    validate,
    isError,
  } = props;
  const [_isShowPass, _setIsShowPass] = useState<boolean>(isShowPass ?? false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    isFocus && inputRef.current?.focus();
  }, [isFocus]);

  return (
    <View>
      {/* Title */}
      {title && (
        <TextComponent
          marginBottom={5}
          fontSize={18}
          fontFamily={fontFamilies.regular}
          color={appColors.black}
          text={title}
        />
      )}
      {/* Input */}
      <View
        style={[
          styles.input_container,
          {
            borderColor: isError
              ? appColors.red
              : !isError && isError != undefined
              ? appColors.green
              : appColors.gray4,
          },
        ]}>
        {affix && <View style={styles.affixAndSuffix}>{affix ?? affix}</View>}
        <TextInput
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          onChangeText={val => onChange(val)}
          secureTextEntry={_isShowPass}
          placeholderTextColor={'#747688'}
          keyboardType={type ?? 'default'}
          autoCapitalize="none"
          onEndEditing={onEnd}
          onBlur={onBlur}
          style={{flex: 1}}
        />
        {allowClear ? (
          <View style={styles.affixAndSuffix}>
            <ButtonComponent
              onPress={() => _setIsShowPass(!_isShowPass)}
              affix={
                <Entypo
                  name={_isShowPass ? 'eye-with-line' : 'eye'}
                  color={appColors.gray5}
                  size={20}
                />
              }
            />
          </View>
        ) : (
          <SpaceComponent width={15} />
        )}
      </View>
      {/* TextError */}
      {validate}
      <SpaceComponent height={marginBottom ?? 19} />
    </View>
  );
};
const styles = StyleSheet.create({
  input_container: {
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    flex: 1,
  },
  affixAndSuffix: {
    marginHorizontal: 15,
  },
});
export default InputComponent;
