import { StyleSheet, Platform } from "react-native";
import colors from "./Colors";
import layout from "./Layout";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  content: {
    paddingHorizontal: 30
  },

  center: {
    justifyContent: "center",
    alignItems: "center"
  },

  row: {
    flexDirection: "row"
  }
});
