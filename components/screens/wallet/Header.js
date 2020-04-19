import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import * as Routes from "../../../navigation";
import i18n from "../../../translations";
import colors from "../../../constants/Colors";
import defaultStyles from "../../../constants/Styles";

const Tabs = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding-vertical: 12px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

const TabsTitle = styled.Text`
  ${defaultStyles.grow};
  ${defaultStyles.headerTwoLinesTitle};
`;

const Cards = styled.Text`
  margin-left: 16px;

  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  opacity: 0.5;

  ${({ active }) =>
    active &&
    `
      opacity: 1;
    `};
`;

const Places = styled.Text`
  margin-left: 16px;

  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  opacity: 0.5;

  ${({ active }) =>
    active &&
    `
      opacity: 1;
    `};
`;

export default function WalletHeader(props) {
  return (
    <Tabs style={[props.style]}>
      <TabsTitle>{props.title}</TabsTitle>

      <TouchableOpacity
        onPress={() => props.navigation.push(Routes.WALLET_CARDS)}
      >
        <Cards active={props.cards}>{i18n.t("wallet.cards")}</Cards>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.push(Routes.WALLET_PLACES)}
      >
        <Places active={props.places}>{i18n.t("wallet.places")}</Places>
      </TouchableOpacity>
    </Tabs>
  );
}
