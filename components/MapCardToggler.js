import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

import i18n from "../translations";
import colors from "../constants/Colors";

const Button = styled.View`
  zIndex: 3;

  alignItems: center;
  justifyContent: center;

  position: absolute;
  bottom: 25;
  left: 0;
  right: 0;

  height: 70;

  backgroundColor: ${colors.primary}
`;

const Text = styled.Text`
  color: ${colors.color}
`;


const MapCardToggler = ({ show, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button>
        <Text>
          {show ? i18n.t("map.closeCards") : i18n.t("map.showCards")}
        </Text>
      </Button>
    </TouchableWithoutFeedback>
  );
};


export default MapCardToggler;
