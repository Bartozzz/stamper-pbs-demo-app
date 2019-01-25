import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Hamburger from "../../components/Hamburger";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfileMenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.menu"),
    headerTitle: "",
    headerRight: <Hamburger navigation={navigation} />,
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.background
    }
    // headerTransparent: true
  });

  render() {
    const { nickname, email, photo, navigation } = this.props;

    return (
      <View style={defaultStyles.container}>
        <View style={styles.menu}>
          <Image style={styles.avatar} source={{ uri: photo }} />

          <Text style={styles.login}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_EDIT)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.edit")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_PASSWORD)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.password")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_TOS)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.tos")}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_LOGOUT)}
          >
            <Text style={styles.menuItemText}>
              {i18n.t("profile.menu.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,

    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.border
  },

  login: {
    marginVertical: 15,

    color: colors.color,
    fontSize: 18,
    fontFamily: layout.fontHead
  },

  email: {
    marginBottom: 30,

    color: colors.label
  },

  menu: {
    flex: 1,
    alignItems: "center",

    marginVertical: 45,
    marginHorizontal: 40,

    borderRadius: 10
  },
  menuSpacer: {
    width: 50,
    height: 1.5,

    backgroundColor: colors.border
  },
  menuItem: {
    marginVertical: 24
  },
  menuItemText: {
    color: colors.color,
    fontSize: 24,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  // …
  nickname: state.profile.nickname,
  email: state.profile.email,
  photo: state.profile.photo
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenuScreen);
