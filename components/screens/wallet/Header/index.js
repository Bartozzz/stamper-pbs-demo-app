import React from "react";
import { TouchableOpacity } from "react-native";

import Theme from "./index.theme";
import * as Styled from "./index.styled";
import * as Routes from "../../../../navigation";
import i18n from "../../../../translations";

export default function WalletHeader(props) {
  return (
    <Theme>
      <Styled.Tabs style={[props.style]}>
        <Styled.TabsTitle>{props.title}</Styled.TabsTitle>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(Routes.WALLET_CARDS, {
              internet: props.internet,
            })
          }
        >
          <Styled.Cards active={props.cards}>
            {i18n.t("wallet.cards")}
          </Styled.Cards>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.push(Routes.WALLET_PLACES, {
              internet: props.internet,
            })
          }
        >
          <Styled.Places active={props.places}>
            {i18n.t("wallet.places")}
          </Styled.Places>
        </TouchableOpacity>
      </Styled.Tabs>
    </Theme>
  );
}
