import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const ErrorImage = require("../../assets/images/error.png");

class ErrorScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  redirect = () => {
    const { navigation } = this.props;
    const screen = navigation.getParam("redirect", Routes.AUTH);

    navigation.navigate(screen);
  };

  render() {
    const { navigation } = this.props;
    const message = navigation.getParam("message", "Error!");

    return (
      <TouchableOpacity
        onPress={this.redirect}
        activeOpacity={1}
        style={[defaultStyles.container, defaultStyles.center, styles.bg]}
      >
        <Image style={styles.image} source={ErrorImage} />
        <Text style={styles.text}>{message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.error
  },
  image: {
    width: 150,
    height: 150
  },
  text: {
    marginTop: 50,

    width: 200,

    alignSelf: "center",
    textAlign: "center",

    fontSize: 22,
    fontFamily: layout.fontText,
    color: colors.color
  }
});

export default ErrorScreen;
