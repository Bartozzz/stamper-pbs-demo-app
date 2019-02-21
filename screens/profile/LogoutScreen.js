import React from "react";
import { connect } from "react-redux";
import { StyleSheet, AsyncStorage, Image, Text, View } from "react-native";

import Button from "../../components/Button";
import Background from "../../components/Background";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import {
  EXPIRY_DATE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken
} from "../../store/reducers/auth";
import { EMAIL } from "../../store/reducers/profile";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const logoutIcon = require("../../assets/images/icons/next_icon.png");

class ProfileLogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.logout"),
    headerRight: <Hamburger navigation={navigation} />
  });

  accept = async event => {
    const { navigation, logout } = this.props;

    // Clear local persistent storage:
    await AsyncStorage.multiRemove([
      EXPIRY_DATE,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      EMAIL
    ]);

    // Clear local volatile storage:
    this.props.setExpiryDate(null);
    this.props.setAccessToken(null);
    this.props.setRefreshToken(null);

    logout().finally(() => navigation.navigate(Routes.AUTH_LOADING));
  };

  refuse = event => {
    this.props.navigation.navigate(Routes.PROFILE_MENU);
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <View style={[defaultStyles.center, styles.logout]}>
          <Image style={styles.logoutIcon} source={logoutIcon} />

          <Text style={styles.logoutText}>{i18n.t("profile.logout.sure")}</Text>
        </View>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            style={styles.button}
            title={i18n.t("yes")}
            onPress={this.accept}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    alignItems: "center",

    paddingVertical: 100,
    marginVertical: 40,
    marginHorizontal: 40,
    marginTop: 80,

    shadowColor: "#2699FB",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,

    borderRadius: 10,
    backgroundColor: colors.background
  },
  logoutText: {
    color: colors.color,
    fontSize: 15,
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

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileLogoutScreen
);
