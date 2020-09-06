import styled from "styled-components/native";
import Colors from "../../constants/Colors";

export const Container = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image.attrs((props) => ({
  resizeMode: "contain",
}))`
  align-self: center;
  width: 150px;
  height: 150px;
`;

export const Title = styled.Text`
  margin-top: 5%;

  color: #ffffff;
  font-size: 26px;
`;

export const Subtitle = styled.Text`
  margin-top: 2%;

  color: ${Colors.info};
  font-size: 18px;
`;
