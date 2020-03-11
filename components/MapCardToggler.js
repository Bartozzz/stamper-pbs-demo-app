import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

import i18n from "../translations";
import colors from "../constants/Colors";

const Button = styled.View`
  z-index: 3;

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 25px;
  left: 0px;
  right: 0px;

  height: 70px;

  background-color: ${colors.primary};
`;

const Text = styled.Text`
  color: ${colors.color};
`;

const MapCardToggler = ({ show, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button>
        <Text>{show ? i18n.t("map.closeCards") : i18n.t("map.showCards")}</Text>
      </Button>
    </TouchableWithoutFeedback>
  );
};

export default MapCardToggler;
