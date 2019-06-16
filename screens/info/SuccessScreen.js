import React from "react";

import * as Routes from "../../navigation";
import colors from "../../constants/Colors";

import InfoScreen from "./InfoScreen";

const SuccessImage = require("../../assets/images/success.png");

class SuccessScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  get size() {
    const { navigation } = this.props;

    const size = navigation.getParam("size", 150);
    const width = navigation.getParam("width", null);
    const height = navigation.getParam("height", null);

    if (width && height) {
      return [width, height];
    } else {
      return [size, size];
    }
  }

  render() {
    const { navigation } = this.props;

    const image = navigation.getParam("image", SuccessImage);
    const message = navigation.getParam("message", "Success!");
    const timeout = navigation.getParam("timeout", 2000);
    const screen = navigation.getParam("redirect", Routes.AUTH);
    const [width, height] = this.size;

    return (
      <InfoScreen
        redirect={() => navigation.navigate(screen)}
        image={image}
        width={width}
        height={height}
        message={message}
        timeout={timeout}
        style={{ backgroundColor: colors.primary }}
      />
    );
  }
}

export default SuccessScreen;
