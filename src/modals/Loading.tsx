import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  messenger?: string;
  onClose?: () => void;
}
const Loading = (props: Props) => {
  const {visible, messenger, onClose} = props;
  return (
    <Modal transparent statusBarTranslucent visible={visible}>
      <View
        style={[
          globalStyles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: appColors.gray6,
          },
        ]}>
        <ActivityIndicator size={45} color={appColors.primary} />
        {messenger && (
          <TextComponent text={messenger} color={appColors.white} />
        )}
      </View>
    </Modal>
  );
};

export default Loading;
