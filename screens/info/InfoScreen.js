import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class InfoScreen extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(this.props.redirect, this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { width, height, image, message } = this.props;

    return (
      <TouchableOpacity
        onPress={this.props.redirect}
        activeOpacity={1}
        style={[
          defaultStyles.container,
          defaultStyles.center,
          this.props.style
        ]}
      >
        <Image style={[{ width, height }]} resizeMode="contain" source={image} />
        <Text style={styles.text}>{message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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

export default InfoScreen;
