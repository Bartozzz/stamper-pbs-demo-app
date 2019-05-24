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
  if (rest.disabled) {
    return (
      <View style={[styles.buttonStyle, styles.disabledButtonStyle, style]}>
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </View>
    );
  }

  if (rest.processing) {
    return (
      <View style={[styles.buttonStyle, styles.disabledButtonStyle, style]}>
        <ActivityIndicator size="small" color={colors.color} />
      </View>
    );
  }

  return (
    <TouchableOpacity style={[styles.buttonStyle, style]} onPress={onPress}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: "poppins-bold",

    color: colors.color,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: colors.shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",

    height: 48,
    width: "100%",

    backgroundColor: colors.primary,
    borderRadius: 5
  },
  disabledButtonStyle: {
    backgroundColor: colors.disabled
  }
});

export default Button;
