import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HeaderHamburger from "../../components/HeaderHamburger";
import Background from "../../components/Background";
import { StamperLogo } from "../../components/Stamper";
import NoInternet from "../../components/NoInternet";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/profile_wn.png");
const EmailImage = require("../../assets/images/icons/email.png");

class ProfileMenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.menu"),
    headerTitle: "",
    headerLeft: null,
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTransparent,
    // headerTransparent: true
  });

  render() {
    const { nickname, email, photo, navigation } = this.props;
    if (!this.props.navigation.state.params.internet) {
      return <NoInternet />;
    }
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <View style={styles.menu}>
          <Image style={styles.avatar} source={{ uri: photo }} />
          <Text style={styles.login}>{nickname}</Text>

          <View style={defaultStyles.row}>
            <Image style={styles.emailIcon} source={EmailImage} />
            <Text style={styles.email}>{email}</Text>
          </View>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push(Routes.PROFILE_EDIT)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.edit")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push(Routes.PROFILE_PASSWORD)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.password")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push(Routes.PROFILE_LEGAL)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.tos")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push(Routes.PROFILE_LOGOUT)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,

    borderRadius: 35,
    borderWidth: 4,
    borderColor: colors.border,
  },

  logo: {
    alignSelf: "center",
  },

  login: {
    marginVertical: 14,

    color: colors.color,
    fontSize: 16,
    fontFamily: "poppins-bold",
  },

  email: {
    marginBottom: 30,

    color: colors.info,
    fontSize: 10,
    fontFamily: "nunito-regular",
  },
  emailIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },

  menu: {
    alignItems: "center",

    paddingTop: 20,
    paddingBottom: 10,
    marginHorizontal: 40,
    marginTop: 25,

    borderRadius: 10,
    backgroundColor: colors.background,
  },
  menuSpacer: {
    width: 50,
    height: 1.5,

    backgroundColor: colors.border,
  },
  menuItem: {
    marginVertical: 14,
  },
  menuItemText: {
    color: colors.color,
    fontSize: 20,
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  // …
  nickname: state.profile.nickname,
  email: state.profile.email,
  photo: state.profile.photo,
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenuScreen);
