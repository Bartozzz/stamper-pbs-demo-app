import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },

  // Utilities:
  isSmallDevice: width < 375,

  // Fonts:
  fontHead: "poppins-black",
  fontText: "nunito-regular"
};
