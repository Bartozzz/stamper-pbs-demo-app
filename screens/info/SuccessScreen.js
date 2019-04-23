import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const SuccessImage = require("../../assets/images/success.png");

class SuccessScreen extends React.Component {
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

  get size() {
    const { navigation } = this.props;

    const size = navigation.getParam("size", 150);
    const height = navigation.getParam("height", null);
    const width = navigation.getParam("width", null);

    if (height && width) {
      return {
        height,
        width
      };
    } else {
      return {
        height: size,
        width: size
      };
    }
  }

  render() {
    const { navigation } = this.props;

    const image = navigation.getParam("image", SuccessImage);
    const message = navigation.getParam("message", "Success!");
    const { height, width } = this.size;

    return (
      <TouchableOpacity
        onPress={this.redirect}
        activeOpacity={1}
        style={[defaultStyles.container, defaultStyles.center, styles.bg]}
      >
        <Image style={[{ width, height }]} source={image} />
        <Text style={styles.text}>{message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primary
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

export default SuccessScreen;
