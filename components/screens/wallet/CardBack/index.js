import * as React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const CardBack = ({ data, onPress }) => {
  return (
    <Theme>
      <Styled.ItemRemove onPress={onPress}>
        <Styled.RemoveImage />
      </Styled.ItemRemove>
    </Theme>
  );
};

export default CardBack;
