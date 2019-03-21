import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },

  // React navigation:
  headerTopSpacer: Platform.select({
    ios: 6,
    android: 0
  }),

  // Utilities:
  isSmallDevice: width < 375,

  // Fonts:
  fontHead: "poppins-black",
  fontText: "nunito-regular"
};
