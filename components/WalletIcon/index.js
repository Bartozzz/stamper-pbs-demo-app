import React from "react";

import * as Styled from "./index.styled";

import WalletImage from "../../assets/images/icons/wallet.png";

export const WalletIcon = ({ color, onPress }) => {
    return (
        <Styled.IconContainer
            backgroundColor={color}
            onPress={onPress}
            testID="wallet-icon"
         >
        <Styled.IconImage source={WalletImage} />
        </Styled.IconContainer>
    );
}

export default WalletIcon;