import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  StyleSheet
} from "react-native";
import colors from "../../constants/Colors";

export function Button({ title, style, textStyle, onPress, ...rest }) {
  const fullStyle = rest.full ? { width: "100%" } : {};

  if (rest.disabled) {
    return (
      <View style={[styles.button, styles.disabledButton, fullStyle, style]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    );
  }

  if (rest.processing) {
    return (
      <View style={[styles.button, styles.disabledButton, fullStyle, style]}>
        <ActivityIndicator size="small" color={colors.color} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, fullStyle, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "poppins-bold",

    color: colors.color,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: colors.shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  button: {
    justifyContent: "center",
    alignItems: "center",

    height: 48,

    backgroundColor: colors.primary,
    borderRadius: 7
  },

  disabledButton: {
    backgroundColor: colors.disabled
  }
});

export default Button;
