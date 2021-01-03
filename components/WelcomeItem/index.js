import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

const WelcomeItem = ({ image, background, title, subtitle, width, flex }) => {
  return (
    <Theme>
      <Styled.Background source={background}>
        <Styled.ImageComponent
          flex={flex}
          resizeMode="contain"
          source={image}
          style={{ width: width || "50%" }}
        />
        <Styled.TitleComponent>{title}</Styled.TitleComponent>
        <Styled.SubtitleComponent>{subtitle}</Styled.SubtitleComponent>
      </Styled.Background>
    </Theme>
  );
};

export default WelcomeItem;
