import React from "react";
import { ImageBackground, View, ScrollView, StyleSheet } from "react-native";
import defaultStyles from "../constants/Styles";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

export default function Background({ children, disableScroll, ...props }) {
  const renderContainer = childs =>
    disableScroll ? (
      <View style={defaultStyles.container}>{childs}</View>
    ) : (
      <ScrollView
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
}
