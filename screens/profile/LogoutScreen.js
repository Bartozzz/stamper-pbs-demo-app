import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  AsyncStorage,
  Image,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import Button from "../../components/Button";
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
