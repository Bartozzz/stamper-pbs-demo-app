import { StyleSheet, Platform } from "react-native";
import colors from "./Colors";
import layout from "./Layout";

export default StyleSheet.create({
  grow: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 30,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
  },

  headerTwoLines: {
    marginTop: layout.headerTopSpacer,
    height: Platform.select({
      ios: 96,
      android: 56,
    }),

    backgroundColor: colors.primary,

    // Remove shadow on iOS:
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    // Remove shadow on Android:
    elevation: 0,
  },
  headerTwoLinesTitle: {
    fontFamily: "poppins-bold",
    fontSize: 26,
    color: colors.color,
  },

  headerTransparent: {
    marginTop: layout.headerTopSpacer,

    // backgroundColor: colors.background,
    backgroundColor: "#001432",

    // Remove shadow on iOS:
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    // Remove shadow on Android:
    elevation: 0,
  },

  headerCenteredTitle: {
    flex: 1,

    fontFamily: "poppins-semi-bold",
    fontSize: 17,

    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
});
