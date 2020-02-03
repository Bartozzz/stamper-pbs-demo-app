import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

import i18n from "../translations";
import colors from "../constants/Colors";

const MapCardToggler = ({ show, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>
          {show ? i18n.t("map.closeCards") : i18n.t("map.showCards")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 3,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,

    height: 70,

    backgroundColor: colors.primary
  },
  text: {
    color: colors.color
  }
});

export default MapCardToggler;
