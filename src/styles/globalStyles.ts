import {StyleSheet} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/appColors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});
