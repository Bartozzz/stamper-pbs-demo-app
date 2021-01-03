import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const HeaderTitle = (props) => {
  return (
    <Theme>
      <Styled.HeaderTitle
        numberOfLines={1}
        {...props}
        accessibilityTraits="header"
      />
    </Theme>
  );
};

export default HeaderTitle;
