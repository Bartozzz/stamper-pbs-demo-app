import React from "react";

import * as Routes from "../../navigation";
import InfoScreen from "./InfoScreen";
import ErrorImage from "../../assets/images/error.png";

class ErrorScreen extends React.Component {
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
    const { route, navigation } = this.props;

    const image = route.params?.image ?? ErrorImage;
    const message = route.params?.message ?? "Error!";
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
        style={{ backgroundColor: "#95989A" }}
      />
    );
  }
}

export default ErrorScreen;
