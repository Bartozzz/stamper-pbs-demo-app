import React from "react";

import * as Styled from "./index.styled";

import images from "../../constants/images";

export const WalletIcon = ({ color, onPress }) => {
  return (
    <Styled.IconContainer
      backgroundColor={color}
      onPress={onPress}
      testID="wallet-icon"
    >
      <Styled.IconImage source={images.Wallet} />
    </Styled.IconContainer>
  );
};

export default WalletIcon;
