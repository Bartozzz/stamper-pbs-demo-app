import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import colors from "../constants/Colors";

class Card extends Component {
  render() {
    const {
      image,
      title,
      subtitle,
      renderPrimaryAction,
      renderSecondaryAction,
      renderButton
    } = this.props;

    return (
      <View style={styles.cardPadder}>
        <View style={styles.card}>
          <View style={styles.cardActionButton}>
            {typeof renderPrimaryAction === "function"
              ? renderPrimaryAction()
              : null}
          </View>

          <View style={styles.cardSecondaryActionButton}>
            {typeof renderSecondaryAction === "function"
              ? renderSecondaryAction()
              : null}
          </View>

          <Image style={styles.cardImage} source={image} />

          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>

          {typeof renderButton === "function" ? renderButton() : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardPadder: {
    width: "50%",
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  card: {
    backgroundColor: colors.color,
    borderRadius: 8
  },
  cardActionButton: {
    position: "absolute",
    top: 0,
    left: 0
  },
  cardSecondaryActionButton: {
    position: "absolute",
    top: 0,
    right: 0
  },
  cardImage: {
    alignSelf: "center",

    marginTop: 35,
    marginBottom: 20,

    // Make sure the image fits:
    resizeMode: "contain",

    width: 60,
    height: 60
  },
  cardTitle: {
    color: "#001432",
    fontSize: 14,
    fontFamily: "poppins-bold",
    textTransform: "uppercase",
    textAlign: "center"
  },
  cardSubtitle: {
    color: "#709BE7",
    fontSize: 9,
    fontFamily: "nunito-regular",
    textTransform: "uppercase",
    textAlign: "center"
  }
});

export default Card;
