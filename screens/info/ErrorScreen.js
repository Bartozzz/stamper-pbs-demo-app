import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const ErrorImage = require("../../assets/images/error.png");

class ErrorScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const timeout = this.props.navigation.getParam("timeout", 2000);
    this.timeout = setTimeout(() => this.redirect(), timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  redirect = () => {
    const { navigation } = this.props;
    const screen = navigation.getParam("redirect", Routes.AUTH);

    navigation.navigate(screen);
  };

  render() {
    const { navigation } = this.props;

    const image = navigation.getParam("image", ErrorImage);
    const message = navigation.getParam("message", "Error!");
    const size = navigation.getParam("size", 150);

    return (
      <TouchableOpacity
        onPress={this.redirect}
        activeOpacity={1}
        style={[defaultStyles.container, defaultStyles.center, styles.bg]}
      >
        <Image style={[{ width: size, height: size }]} source={image} />
        <Text style={styles.text}>{message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#95989A"
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
