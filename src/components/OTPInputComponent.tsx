import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  id: number;
  onChange: (id: number, val: string) => void;
  isFocus: boolean;
  code: string;
}
const OTPInputComponent = (props: Props) => {
  const inputRef = useRef<TextInput>(null);
  const {isFocus, onChange, id, code} = props;
  const [showLine, setShowLine] = useState<boolean>(true);
  const [shouldShowKeyboard, setShouldShowKeyboard] = useState(false);

  useEffect(() => {
    if (shouldShowKeyboard && inputRef.current) {
      inputRef.current.focus();
      setShouldShowKeyboard(false);
    }
  }, [shouldShowKeyboard]);

  useEffect(() => {
    if (inputRef?.current) {
      isFocus && setShouldShowKeyboard(true);
    }
  }, [isFocus]);

  return (
    <View
      style={[
        {
          backgroundColor: !showLine ? appColors.gray2 : appColors.white,
        },
        styles.wrapper_input,
      ]}>
      <TextInput
        caretHidden={true}
        ref={inputRef}
        value={code}
        keyboardType="numeric"
        onChangeText={val =>
          onChange(id, val.length === 0 ? val : val[val.length - 1])
        }
        onFocus={() => setShowLine(false)}
        onBlur={() => setShowLine(true)}
        style={styles.input}
        selection={{start: code.length, end: code.length}}
      />
      {showLine && !Boolean(code) && (
        <View
          style={{
            position: 'absolute',
            width: 13.5,
            height: 2,
            backgroundColor: appColors.gray4,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper_input: {
    overflow: 'hidden',
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: appColors.gray4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    width: '100%',
    height: '100%',
  },
});
export default memo(OTPInputComponent);
