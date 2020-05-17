import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import normalize from "react-native-normalize";

import i18n from "../translations";
import colors from "../constants/Colors";

const Button = styled.View`
  z-index: 3;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  bottom: 25px;
  left: 0px;
  right: 0px;

  height: ${normalize(70)}px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

const TextCount = styled.Text`
  color: ${colors.color};
`;

const TextControl = styled.Text`
  color: ${colors.color};
  text-transform: uppercase;
`;

const MapCardToggler = ({ show, count, onPress }) => {
  const controlText = show ? i18n.t("map.closeCards") : i18n.t("map.showCards");

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button>
        <TextCount>{i18n.t("map.count", { count })}</TextCount>
        <TextControl>{controlText}</TextControl>
      </Button>
    </TouchableWithoutFeedback>
  );
};

export default MapCardToggler;
