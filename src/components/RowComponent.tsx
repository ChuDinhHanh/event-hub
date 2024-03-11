import React, { ReactNode } from 'react';
import { FlexAlignType, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
  alignItems?: FlexAlignType | undefined;
  children: ReactNode;
  onPress?: () => void;
  marginVertical?: number;
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
}

const RowComponent = (props: Props) => {
  const { children, alignItems, justifyContent, onPress, marginVertical } = props;
  return (
    <React.Fragment>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      ) : (
        <View style={[{ alignItems, justifyContent, marginVertical }, globalStyles.row]}>
          {children}
        </View>
      )}
    </React.Fragment>
  );
};

export default RowComponent;
