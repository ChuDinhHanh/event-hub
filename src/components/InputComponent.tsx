import { View, Text, KeyboardType, TextInput, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { appColors } from '../constants/appColors';
import SpaceComponent from './SpaceComponent';


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
}
const InputComponent = (props: Props) => {
    const { allowClear, isShowPass, placeholder, affix, onChange, onEnd, suffix, type, value } = props;
    return (
        <View style={styles.input_container}>
            {affix && <View style={styles.affix}>{affix ?? affix}</View>}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    input_container: {
        borderWidth: 1,
        borderColor: appColors.gray4,
        borderRadius: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 56,
        marginBottom: 19
    },
    affix: {
        marginHorizontal: 15
    }
})
export default InputComponent