import React from "react";
import { TouchableWithoutFeedback } from "react-native";

import * as Styled from "./index.styled";
import i18n from "../../translations";

const MapCardToggler = ({ show, count, onPress }) => {
  const controlText = show ? i18n.t("map.closeCards") : i18n.t("map.showCards");

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Styled.Button>
        <Styled.TextCount>{i18n.t("map.count", { count })}</Styled.TextCount>
        <Styled.TextControl testID="toggler-text">
          {controlText}
        </Styled.TextControl>
      </Styled.Button>
    </TouchableWithoutFeedback>
  );
};

export default MapCardToggler;
