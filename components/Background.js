import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%"
  }
});

export default function Background({ children, style, ...props }) {
  return (
    <ImageBackground
      resizeMode="stretch"
      {...props}
      style={[styles.background, props.style]}
    >
      {children}
    </ImageBackground>
  );
}
