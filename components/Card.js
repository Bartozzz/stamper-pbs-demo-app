import React, { Component } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import colors from "../constants/Colors";

class Card extends Component {
  render() {
    const {
      image,
      title,
      subtitle,
      action,
      onPress,
      renderAction
    } = this.props;

    return (
      <View style={styles.cardPadder}>
        <View style={styles.card}>
          <View style={styles.cardActionButton}>
            {typeof renderAction === "function" ? renderAction() : null}
          </View>

          <Image style={styles.cardImage} source={image} />

          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>

          <TouchableOpacity style={styles.cardButton} onPress={onPress}>
            <Text style={styles.cardButtonText}>{action}</Text>
          </TouchableOpacity>
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
  cardImage: {
    alignSelf: "center",

    marginTop: 35,
    marginBottom: 20,

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
  },
  cardButton: {
    padding: 4,
    marginHorizontal: 4,
    marginBottom: 4,
    marginTop: 10,

    backgroundColor: colors.primary,
    borderRadius: 7
  },
  cardButtonText: {
    color: colors.color,
    fontSize: 15,
    fontFamily: "poppins-bold",
    textTransform: "uppercase",
    textAlign: "center"
  }
});

export default Card;
