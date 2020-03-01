import React from "react";
import styled from "styled-components/native";
import WalletImage from "../../assets/images/icons/wallet.png";

const IconContainer = styled.TouchableOpacity`
  marginVertical: 10;
  marginHorizontal: 13;

  padding: 5;

  borderRadius: 20;
  
  backgroundColor: ${props => props.backgroundColor}
`;

const IconImage = styled.Image`
  width: 14;
  height: 14
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