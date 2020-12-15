import React from "react";
import * as Styled from "./index.styled";

import images from "../../constants/images";

export const CardBackground = ({ src, children }) => {
  return (
    <Styled.ImageBackground source={images.BackgroundCard}>
      {src ? (
        <Styled.ImageBackground testID="card-background" source={{ uri: src }}>
          {children}
        </Styled.ImageBackground>
      ) : (
        children
      )}
    </Styled.ImageBackground>
  );
};

export default CardBackground;
