import React from "react";

import * as Routes from "../../navigation";
import InfoScreen from "./InfoScreen";
import ErrorImage from "../../assets/images/error.png";

class ErrorScreen extends React.Component {
  static navigationOptions = {
    header: null,
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

    const image = navigation.getParam("image", ErrorImage);
    const message = navigation.getParam("message", "Error!");
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
        style={{ backgroundColor: "#95989A" }}
      />
    );
  }
}

export default ErrorScreen;
