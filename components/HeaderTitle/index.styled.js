import { Platform, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

// For some reasons it doesn't work with styled-components
export const HeaderTitle = StyleSheet.create({
  styles: {
    ...Platform.select({
      android: {
        marginBottom: 9,
      },
      ios: {
        // Standard header margin:
        marginVertical: 6,
      },
    }),

    color: colors.color,
    fontFamily: "poppins-bold",
    fontSize: Platform.select({
      android: 20,
      ios: 26,
    }),

    // Align to the bottom of the container:
    alignSelf: "flex-end",
  },
});
