import React from "react";
import { ImageBackground, View, ScrollView } from "react-native";

import defaultStyles from "../../constants/Styles";
import styles from "./index.styled";

export const Background = ({ children, disableScroll, ...props }) => {
  const renderContainer = (childs) =>
    disableScroll ? (
      <View testID="background-view" style={defaultStyles.container}>
        {childs}
      </View>
    ) : (
      <ScrollView
        testID="background-scrollview"
        style={defaultStyles.container}
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
      >
        {childs}
      </ScrollView>
    );

  return renderContainer(
    <ImageBackground
      resizeMode="stretch"
      {...props}
      style={[styles.background, props.style]}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;
