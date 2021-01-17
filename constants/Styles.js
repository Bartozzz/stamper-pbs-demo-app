import { StyleSheet, Platform } from "react-native";
import theme from "./theme";
import getFont from "../helpers/getFont";
import layout from "./Layout";

export default StyleSheet.create({
  grow: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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

    backgroundColor: theme.colors.primary,

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
    fontFamily: getFont("poppins", "bold", false),
    fontSize: 26,
    color: theme.colors.white,
  },

  headerTransparent: {
    marginTop: layout.headerTopSpacer,

    // backgroundColor: colors.background,
    backgroundColor: theme.colors.background200,

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

    fontFamily: getFont("poppins", "semiBold", false),
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
