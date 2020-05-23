import React from "react";
import AddedImage from "../../../assets/images/icons/already-in-wallet.png";
import i18n from "../../../translations";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
  margin-right: 14px;
`;

const Icon = styled.Image.attrs((props) => ({
  source: AddedImage,
}))`
  height: 56px;
  width: 74px;
`;

const Text = styled.Text`
  position: absolute;
  top: 2px;
  left: 4px;

  color: ${colors.primary};
  font-size: 6px;
  font-family: nunito-regular;
`;

export function IconInWallet() {
  return (
    <Container>
      <Icon />
      <Text>{i18n.t("map.cardAlreadyAdded")}</Text>
    </Container>
  );
}

export default IconInWallet;
