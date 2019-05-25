import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import * as Routes from "../../navigation";

export function BackButton(props) {
  function onPress() {
    props.onPress
      ? props.onPress()
      : props.navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <TouchableOpacity style={styles.back} onPress={onPress}>
      <Ionicons
        style={styles.backIcon}
        name={backIconName}
        size={backIconSize}
        color="white"
      />
    </TouchableOpacity>
  );
}

const backIconName = Platform.select({
  ios: "ios-arrow-round-back",
  android: "md-arrow-round-back"
});

const backIconSize = Platform.select({
  ios: 40,
  android: 24
});

const styles = StyleSheet.create({
  back: {
    alignSelf: "flex-start"
  },

  backIcon: {
    ...Platform.select({
      ios: {
        paddingTop: 1,
        paddingLeft: 20
      },
      android: {
        paddingTop: 16,
        paddingRight: 8,
        paddingLeft: 16
      }
    })
  }
});

export default BackButton;
