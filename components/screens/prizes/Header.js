import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import * as Routes from "../../../navigation";
import i18n from "../../../translations";
import colors from "../../../constants/Colors";

const Tabs = styled.View`
  flex-direction: row;
  align-items: center;

  padding-vertical: 13px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

const AvailablePrizes = styled.Text`
  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  ${({ active }) =>
    active &&
    `
      font-family: poppins-bold;
    `};
`;

const ReceivedPrizes = styled.Text`
  text-align: right;

  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  ${({ active }) =>
    active &&
    `
      font-family: poppins-bold;
    `};
`;

export default function PrizesHeader(props) {
  return (
    <Tabs style={[props.style]}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_LIST)}
        >
          <AvailablePrizes active={props.available}>
            {i18n.t("prizes.available")}
          </AvailablePrizes>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_RECEIVED)}
        >
          <ReceivedPrizes active={props.received}>
            {i18n.t("prizes.received")}
          </ReceivedPrizes>
        </TouchableOpacity>
      </View>
    </Tabs>
  );
}
