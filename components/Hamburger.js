import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";

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
        paddingLeft: 8,
        paddingRight: 16
      }
    })
  }
});

export default function Hamburger(props) {
  return (
    <TouchableOpacity
      style={styles.hamburger}
      onPress={() => props.navigation.navigate("Dashboard")}
    >
      <Ionicons
        style={styles.hamburgerIcon}
        name={Platform.select({
          ios: "ios-menu",
          android: "md-menu"
        })}
        size={Platform.select({
          ios: 32,
          android: 24
        })}
        color="white"
      />
    </TouchableOpacity>
  );
}
