import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../constants/Colors";

class CardButton extends Component {
  render() {
    const { title, style, disabled, onPress } = this.props;

    if (disabled) {
      return (
        <View style={[styles.cardButton, styles.cardButtonDisabled, style]}>
          <Text style={styles.cardButtonText}>{title}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity style={[styles.cardButton, style]} onPress={onPress}>
        <Text style={styles.cardButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardButton: {
    padding: 4,
    marginHorizontal: 4,
    marginBottom: 4,
    marginTop: 10,

    backgroundColor: colors.primary,
    borderRadius: 7
  },
  cardButtonDisabled: {
    backgroundColor: "#95989A"
  },
  cardButtonText: {
    color: colors.color,
    fontSize: 15,
    fontFamily: "poppins-bold",
    textTransform: "uppercase",
    textAlign: "center"
  }
});

export default CardButton;
