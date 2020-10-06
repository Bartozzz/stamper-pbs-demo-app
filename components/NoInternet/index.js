import * as React from "react";
import * as Styled from "./index.styled";

import Background from "../Background";
import i18n from "../../translations";

import Icon from "../../assets/offline.png";

export const NoInternet = () => {
  return (
    <Background>
      <Styled.Container>
        <Styled.Image source={Icon} />
        <Styled.Title>{i18n.t("offline.main")}</Styled.Title>
        <Styled.Subtitle>{i18n.t("offline.details")}</Styled.Subtitle>
      </Styled.Container>
    </Background>
  );
};

export default NoInternet;