import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import colors from "../constants/Colors";
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

export default function Background({ children, style, ...props }) {
  return (
    <ScrollView
      style={defaultStyles.container}
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
    >
      <ImageBackground
        resizeMode="stretch"
        {...props}
        style={[styles.background, props.style]}
      >
        {children}
      </ImageBackground>
    </ScrollView>
  );
}
