import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  OnboardingItemComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import SessionComponent from '../../components/SessionComponent';
import { appColors } from '../../constants/appColors';
import { appInfo } from '../../constants/appInfos';
import { appScreens } from '../../constants/appScreens';
import { appVariables } from '../../constants/appVariables';
import { fontFamilies } from '../../constants/fontFamilies';
import { onboardingData } from '../../data/data';

const OnboardingScreen = ({ navigation }: any) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const singleOnboardingWidth = appInfo.sizes.WIDTH;
  const numberDots = onboardingData.length;
  const totalWidth = numberDots * singleOnboardingWidth;

  const handleOnPressButtonEvent = (type: number) => {
    if (type === appVariables.NEXT && currentIndex + 1 !== numberDots) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
      return;
    }
    navigation.navigate(appScreens.LOGIN_SCREEN);
  };

  return (
    <ContainerComponent>
      <FlatList
        ref={flatListRef}
        onScroll={event => {
          setCurrentIndex(
            Math.round(
              event.nativeEvent.contentOffset.x / singleOnboardingWidth,
            ),
          );
        }}
        pagingEnabled={true}
        contentContainerStyle={{
          width: totalWidth,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={onboardingData}
        extraData={onboardingData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <OnboardingItemComponent
            key={item.id}
            image={item.image}
            title={item.title}
            content={item.content}
          />
        )}
      />
      {/* Bottom area*/}
      <SessionComponent
        padding={0}
        style={styles.wrapper_bottom}>
        <SessionComponent>
          <RowComponent alignItems="center" justifyContent="space-between">
            <ButtonComponent
              onPress={() => handleOnPressButtonEvent(appVariables.SKIP)}
              title={
                <TextComponent
                  text="Skip"
                  fontFamily={fontFamilies.medium}
                  color={appColors.purple}
                  fontSize={18}
                />
              }
            />
            {/* printf dots */}
            <RowComponent alignItems="center" justifyContent="space-between">
              {Array.from({ length: numberDots }, (_, index) => (
                <View
                  key={index}
                  style={
                    [styles.wrapper_dots, {
                      backgroundColor:
                        currentIndex === index
                          ? appColors.white
                          : appColors.white1,
                    }]
                  }
                />
              ))}
            </RowComponent>
            <ButtonComponent
              onPress={() => handleOnPressButtonEvent(appVariables.NEXT)}
              title={
                <TextComponent
                  text="Next"
                  color={appColors.white}
                  fontSize={18}
                  fontFamily={fontFamilies.medium}
                />
              }
            />
          </RowComponent>
        </SessionComponent>
      </SessionComponent>
    </ContainerComponent>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  text: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  wrapper_bottom: {
    position: 'absolute',
    zIndex: 999,
    bottom: 0,
    width: '100%',
  },
  wrapper_dots: {
    padding: 3.5,
    borderRadius: 3.5,
    marginRight: 3.5,
  }
});
