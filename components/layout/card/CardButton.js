import React from "react";
import { StyleSheet } from "react-native";
import Button from "../../forms/Button";

export function CardButton({ style, textStyle, ...props }) {
  return (
    <Button
      {...props}
      style={[style, styles.button]}
      textStyle={[textStyle, styles.text]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    marginHorizontal: 4,
    marginBottom: 4,
    marginTop: 10,

    height: "auto"
  },

  text: {
    fontSize: 15
  }
});

export default CardButton;
