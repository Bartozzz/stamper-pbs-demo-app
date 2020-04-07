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
  flex: ${props => props.flex ? props.flex : 1};
  align-self: center;
  margin-top: 20px;
`;

const TitleComponent = styled(Text)`
  font-size: 24px;
  font-family: poppins-bold;

  color: ${colors.color};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${colors.shadow};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;

  margin-top: 5%
`;

const SubtitleComponent = styled(Text)`
  color: ${colors.info};
  text-align: center;
  margin-top: 10px;
  align-self: center;
  width: ${Dimensions.get("window").width * 0.85}px
`

const WelcomeItem = ({ image, background, title, subtitle, width, flex }) => {
    return (
        <Background source={background}>
            <ImageComponent flex={flex} resizeMode='contain' source={image} style={{width: width ? width : '50%'}}/>
            <TitleComponent>{title}</TitleComponent>
            <SubtitleComponent>{subtitle}</SubtitleComponent>
        </Background>
    )
};

export default WelcomeItem;
