import React from "react";
import { connect } from "react-redux";
import { StyleSheet, AsyncStorage, Image, Text, View } from "react-native";

import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderTitle from "../../components/nav/HeaderTitle";
import HeaderBackIcon from "../../components/nav/HeaderBack";

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
import { FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const logoutIcon = require("../../assets/images/icons/next_icon.png");

class ProfileLogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.logout"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.navigate(Routes.PROFILE_MENU)}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    processing: false
  };

  accept = async () => {
    this.setState({ processing: true });

    const { navigation, logout } = this.props;

    // Clear local persistent storage:
    await AsyncStorage.multiRemove([
      EXPIRY_DATE,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      EMAIL
    ]);

    // When user is logged out, force the refresh of offline-first elements:
    await AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));
    await AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));

    // Clear local volatile storage:
    this.props.setExpiryDate(null);
    this.props.setAccessToken(null);
    this.props.setRefreshToken(null);

    logout().finally(() => navigation.navigate(Routes.AUTH_LOADING));
  };

  refuse = () => {
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
            processing={this.state.processing}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
            processing={this.state.processing}
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    alignItems: "center",

    paddingTop: 40,
    paddingBottom: 44,
    marginVertical: 20,
    marginHorizontal: 36,
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
    marginBottom: 60
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50
  },
  button: {
    width: 90
  }
});

const mapStateToProps = () => ({
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
