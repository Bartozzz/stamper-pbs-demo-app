import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import * as Routes from "../navigation";

const styles = StyleSheet.create({
  backIcon: {
    ...Platform.select({
      ios: {
        paddingLeft: 20
      },
      android: {
        paddingRight: 8,
        paddingLeft: 16
      }
    })
  }
});

export default function BackButton(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.onPress
          ? props.onPress()
          : props.navigation.navigate(Routes.DASHBOARD)
      }
    >
      <Ionicons
        style={styles.backIcon}
        name={Platform.select({
          ios: "ios-arrow-round-back",
          android: "md-arrow-round-back"
        })}
        size={Platform.select({
          ios: 40,
          android: 24
        })}
        color="white"
      />
    </TouchableOpacity>
  );
}
