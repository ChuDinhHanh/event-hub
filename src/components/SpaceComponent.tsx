import React from 'react';
import {View} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const SpaceComponent = (props: Props) => {
  const {height, width} = props;
  return <View style={{height, width}} />;
};

export default SpaceComponent;
