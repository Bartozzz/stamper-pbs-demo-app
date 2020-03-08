import React from "react";
import styled from "styled-components/native";
import WalletImage from "../../assets/images/icons/wallet.png";

const IconContainer = styled.TouchableOpacity`
  margin-vertical: 10px;
  margin-horizontal: 13px;

  padding: 5px;

  border-radius: 20px;
  
  background-color: ${props => props.backgroundColor};
`;

const IconImage = styled.Image`
  width: 14px;
  height: 14px;
`;

export class WalletIcon extends React.Component {
  render() {
    const { color, onPress } = this.props;

    return (
      <IconContainer
        backgroundColor={color}
        onPress={onPress}
      >
        <IconImage source={WalletImage} />
      </IconContainer>
    );
  }
}

export default WalletIcon;