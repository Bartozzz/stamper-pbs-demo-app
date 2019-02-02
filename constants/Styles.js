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
  },

  headerTransparent: {
    // backgroundColor: colors.background,
    backgroundColor: "#001432",

    // Remove shadow on iOS:
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    // Remove shadow on Android:
    elevation: 0
  }
});
