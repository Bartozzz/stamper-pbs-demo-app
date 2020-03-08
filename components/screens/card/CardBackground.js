import React from "react";
import styled from "styled-components/native";

import defaultStyles from "../../../constants/Styles";
import CardImage from "../../../assets/backgrounds/card.png";

const ImageBackground = styled.ImageBackground.attrs(props => ({
  resizeMode: "cover"
}))`
  ${defaultStyles.grow};
  ${defaultStyles.row};

  width: 100%;
  height: 100%;

  border-radius: 10px;
`;

export function CardBackground({ src, children }) {
  return (
    <ImageBackground
      source={CardImage}
    >
      {src ? (
        <ImageBackground
          source={{ uri: src }}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </ImageBackground>
  );
}

export default CardBackground;
