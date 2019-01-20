import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const logoutIcon = require("../../assets/images/icons/next_icon.png");

class ProfileLogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Wyloguj się",
    headerRight: <Hamburger navigation={navigation} />
  });

  accept = event => {
    console.log("Logging out");

    this.props.navigation.navigate(Routes.AUTH_LOADING);
  };

  refuse = event => {
    this.props.navigation.navigate(Routes.PROFILE_MENU);
  };

  render() {
    return (
      <View style={[defaultStyles.container, defaultStyles.content]}>
        <View style={[defaultStyles.center, styles.logout]}>
          <Image style={styles.logoutIcon} source={logoutIcon} />

          <Text style={styles.logoutText}>
            Jesteś pewien {"\n"} że chcesz się wylogować?
          </Text>
        </View>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button style={styles.button} title="Tak" onPress={this.accept} />
          <Button style={styles.button} title="Nie" onPress={this.refuse} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    flex: 1,
    alignItems: "center",

    marginVertical: 45,
    marginHorizontal: 20,

    borderRadius: 10
  },
  logoutText: {
    color: colors.color,
    fontSize: 18,
    textAlign: "center"
  },
  logoutIcon: {
    width: 120,
    height: 120,
    marginBottom: 100
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50
  },
  button: {
    width: 90
  }
});

export default ProfileLogoutScreen;
