import styled from "styled-components/native";

export const Container = styled.View`
  overflow: hidden;
  background-color: white;

  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Marker = styled.Image.attrs((props) => ({
  resizeMode: "contain",
}))`
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
