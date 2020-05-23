import React from "react";
import * as Styled from "./index.styled";

import CardImage from "../../assets/backgrounds/card.png";

export const CardBackground = ({ src, children }) => {
  return (
    <Styled.ImageBackground source={CardImage}>
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
