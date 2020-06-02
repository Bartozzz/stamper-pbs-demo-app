import React from "react";
import { TouchableOpacity, View } from "react-native";

import * as Styled from "./index.styled";
import * as Routes from "../../../../navigation";
import i18n from "../../../../translations";

export const PrizesHeader = (props) => {
  return (
    <Styled.Tabs style={[props.style]}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_LIST)}
        >
          <Styled.AvailablePrizesText
            testID="prizes-available"
            active={props.available}
          >
            {i18n.t("prizes.available")}
          </Styled.AvailablePrizesText>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_RECEIVED)}
        >
          <Styled.ReceivedPrizesText
            testID="prizes-received"
            active={props.received}
          >
            {i18n.t("prizes.received")}
          </Styled.ReceivedPrizesText>
        </TouchableOpacity>
      </View>
    </Styled.Tabs>
  );
};

export default PrizesHeader;
