import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import WalletImage from "../../assets/images/icons/wallet.png";

export class WalletIcon extends React.Component {
  render() {
    const { color, onPress } = this.props;

    return (
      <TouchableOpacity
        style={[styles.iconContainer, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Image style={styles.iconImage} source={WalletImage} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    marginVertical: 10,
    marginHorizontal: 13,

    padding: 5,

    borderRadius: 20
  },
  iconImage: {
    width: 14,
    height: 14
  }
});

export default WalletIcon;
