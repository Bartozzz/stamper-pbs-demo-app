import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Text, View } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import Button from "../../components/Button";
import Background from "../../components/Background";
import HeaderTitle from "../../components/HeaderTitle";
import HeaderHamburger from "../../components/HeaderHamburger";
import HeaderBack from "../../components/HeaderBack";

import {
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
} from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

import images from "../../constants/images";

class ProfileLogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.logout"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack navigation={navigation} onPress={() => navigation.goBack()} />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    processing: false,
  };

  accept = async () => {
    this.setState({ processing: true });

    // Clear local volatile storage:
    this.props.setExpiryDate(null);
    this.props.setAccessToken(null);
    this.props.setRefreshToken(null);

    this.props.logout().finally(() => {
      this.props.navigation.navigate(Routes.AUTH_LOADING);
      Analytics.logEvent("sign_out");
    });
  };

  refuse = () => {
    this.props.navigation.navigate(Routes.PROFILE_MENU, { internet: true });
  };

  render() {
    return (
      <Background source={images.BackgroundLogoutWn}>
        <View style={[defaultStyles.center, styles.logout]}>
          <Image style={styles.logoutIcon} source={images.NextIcon} />

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
    backgroundColor: colors.background,
  },
  logoutText: {
    color: colors.color,
    fontSize: 15,
    textAlign: "center",
  },
  logoutIcon: {
    width: 120,
    height: 120,
    marginBottom: 60,
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
  },
  button: {
    width: 90,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLogoutScreen);
