import React from "react";
import { Image, Text, View, ImageBackground, Dimensions } from "react-native";
import styled from "styled-components/native";
import colors from "../constants/Colors";

const Background = styled(ImageBackground)`
 flex: 1;
 resize-mode: cover;
 justify-content: center;
`;

const ImageComponent = styled(Image)`
  flex: 1;
  width: 50%;
  align-self: center;
  margin-top: 50px;
`;

const TitleComponent = styled(Text)`
  font-size: 25px;
  font-family: poppins-bold;

  color: ${colors.color};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${colors.shadow};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;

  margin-top: 10px
`;

const SubtitleComponent = styled(Text)`
  color: ${colors.info};
  text-align: center;
  margin-top: 10px;
  align-self: center;
  width: ${Dimensions.get("window").width * 0.85}px
`

const WelcomeItem = ({ image, background, title, subtitle  }) => {
    return (
        <Background source={background}>
            <ImageComponent resizeMode='contain' source={image} />
            <TitleComponent>{title}</TitleComponent>
            <SubtitleComponent>{subtitle}</SubtitleComponent>
        </Background>
    )
};

export default WelcomeItem;
