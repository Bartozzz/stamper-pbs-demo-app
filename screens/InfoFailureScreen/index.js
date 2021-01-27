import React from "react";

import Theme from "./index.theme";
import * as Routes from "../../navigation";
import AlertModal from "../../components/AlertModal";
import images from "../../constants/images";
import { getSize } from "../../helpers/getSize";

function InfoFailureScreen({ navigation }) {
  const image = navigation.getParam("image", images.Error);
  const size = navigation.getParam("size", 150);
  const width = navigation.getParam("width", null);
  const height = navigation.getParam("height", null);
  const [imageWidth, imageHeight] = getSize(width, height, size);

  const message = navigation.getParam("message", "Error!");
  const timeout = navigation.getParam("timeout", 2000);
  const screen = navigation.getParam("redirect", Routes.AUTH);

  return (
    <AlertModal
      redirect={() => navigation.navigate(screen, { internet: true })}
      image={image}
      width={imageWidth}
      height={imageHeight}
      message={message}
      timeout={timeout}
      style={{ backgroundColor: Theme.backgroundColor }}
    />
  );
}

InfoFailureScreen.navigationOptions = {
  header: null,
};

export default InfoFailureScreen;
