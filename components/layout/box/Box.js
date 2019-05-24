import React from "react";
import { StyleSheet, View } from "react-native";
import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";

export function Box({ children, style }) {
  return (
    <View style={[defaultStyles.center, styles.box, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",

    paddingTop: 40,
    paddingBottom: 40,
    marginVertical: 20,
    marginHorizontal: 20,

    shadowColor: "#2699FB",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,

    borderRadius: 10,
    backgroundColor: colors.background
  }
});

export default Box;
