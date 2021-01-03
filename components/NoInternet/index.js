import * as React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

import Background from "../Background";
import i18n from "../../translations";

import images from "../../constants/images";

export const NoInternet = ({ dark = false }) => {
  return (
    <Theme dark={dark}>
      <Background>
        <Styled.Container>
          <Styled.Image source={images.Offline} />
          <Styled.Title>{i18n.t("offline.main")}</Styled.Title>
          <Styled.Subtitle>{i18n.t("offline.details")}</Styled.Subtitle>
        </Styled.Container>
      </Background>
    </Theme>
  );
};

export default NoInternet;
