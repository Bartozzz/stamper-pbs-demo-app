import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

import defaultStyles from "../../../constants/Styles";
import CardImage from "../../../assets/backgrounds/card.png";

export function CardBackground({ src, children }) {
  return (
    <ImageBackground
      source={CardImage}
      style={styles.background}
      resizeMode="cover"
    >
      {src ? (
        <ImageBackground
          source={{ uri: src }}
          style={styles.background}
          resizeMode="cover"
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    ...defaultStyles.grow,
    ...defaultStyles.row,

    width: "100%",
    height: "100%",

    borderRadius: 10
  }
});

export default CardBackground;
