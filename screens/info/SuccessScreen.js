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
    const { route } = this.props;

    const size = route.params?.size ?? 150;
    const width = route.params?.width ?? null;
    const height = route.params?.height ?? null;

    if (width && height) {
      return [width, height];
    } else {
      return [size, size];
    }
  }

  render() {
    const { navigation, route } = this.props;

    const image = route.params?.image ?? SuccessImage;
    const message = route.params?.message ?? "Success!";
    const timeout = route.params?.timeout ?? 2000;
    const screen = route.params?.redirect ?? Routes.AUTH;
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
