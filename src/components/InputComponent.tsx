import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {KeyboardType, StyleSheet, TextInput, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {appColors} from '../constants/appColors';
import ButtonComponent from './ButtonComponent';

interface Props {
  value?: string;
  affix?: ReactNode;
  suffix?: ReactNode;
  onChange: (val: string) => void;
  isShowPass?: boolean;
  allowClear: boolean;
  type?: KeyboardType;
  placeholder: string;
  onEnd?: () => void;
  marginBottom?: number;
  isFocus?: boolean;
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
  } = props;
  const [_isShowPass, _setIsShowPass] = useState<boolean>(isShowPass ?? false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    isFocus && inputRef.current?.focus();
  }, [isFocus]);

  return (
    <View style={[styles.input_container, {marginBottom: marginBottom ?? 19}]}>
      {affix && <View style={styles.affix}>{affix ?? affix}</View>}
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
      />
      {allowClear && (
        <View style={styles.suffix}>
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input_container: {
    borderWidth: 1,
    borderColor: appColors.gray4,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  affix: {
    marginHorizontal: 15,
  },
  suffix: {
    position: 'absolute',
    right: 15,
  },
});
export default InputComponent;
