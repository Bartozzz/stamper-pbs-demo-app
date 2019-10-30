import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import * as Routes from "../../navigation";

export function HeaderHamburger(props) {
  function onPress() {
    props.navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <TouchableOpacity style={styles.hamburger} onPress={onPress}>
      <Ionicons
        style={styles.hamburgerIcon}
        name={hamburgerIconName}
        size={hamburgerIconSize}
        color="white"
      />
    </TouchableOpacity>
  );
}

const hamburgerIconName = Platform.select({
  ios: "md-home",
  android: "md-home"
});

const hamburgerIconSize = Platform.select({
  ios: 32,
  android: 24
});

const styles = StyleSheet.create({
  hamburger: {
    alignSelf: "flex-start"
  },

  hamburgerIcon: {
    ...Platform.select({
      ios: {
        paddingTop: 5,
        paddingRight: 20
      },
      android: {
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 16
      }
    })
  }
});

export default HeaderHamburger;
