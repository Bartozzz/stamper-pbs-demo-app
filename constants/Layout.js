import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },

  // React navigation:
  headerTopSpacer: 6,

  // Utilities:
  isSmallDevice: width < 375,

  // Fonts:
  fontHead: "poppins-black",
  fontText: "nunito-regular"
};
