import styled from "styled-components/native";
import { Dimensions } from "react-native";

import colors from "../../constants/Colors";

export const Background = styled.ImageBackground`
flex: 1;
resize-mode: cover;
justify-content: center;
`;

export const ImageComponent = styled.Image`
flex: ${props => props.flex ? props.flex : 1};
align-self: center;
margin-top: 20px;
`;

export const TitleComponent = styled.Text`
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

export const SubtitleComponent = styled.Text`
color: ${colors.info};
text-align: center;
margin-top: 10px;
align-self: center;
width: ${Dimensions.get("window").width * 0.85}px
`