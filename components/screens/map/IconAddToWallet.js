import React from "react";
import styled from "styled-components/native";
import PlusImage from "../../../assets/images/plus.png";

const Container = styled.TouchableOpacity`
  margin-right: 16px;
`;

const Icon = styled.Image.attrs(props => ({
  source: PlusImage
}))`
  width: 48px;
  height: 48px;
`;

export function IconAddToWallet({ style, onPress }) {
  return (
    <Container onPress={onPress}>
      <Icon style={[style]} />
    </Container>
  );
}

export default IconAddToWallet;
