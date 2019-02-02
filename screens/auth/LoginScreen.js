import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground
} from "react-native";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";

import { login, ACCESS_TOKEN, REFRESH_TOKEN } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import { getErrorsFromResponse } from "../../helpers/errors";

const BackgroundImage = require("../../assets/backgrounds/password.png");

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.auth.login"),
    header: null
  };

  state = {
    // password: null,
    // email: null,
    password: "Test1234+",
    email: "testing@test.pl",

    error: {
      password: null,
      email: null,
      other: null
    }
  };

  loginWithFacebook = () => {
    console.log("Logging-in with Facebook");
  };

  loginWithGoogle = () => {
    console.log("Logging-in with Google");
  };

  loginWithCredentials = () => {
    const { email, password } = this.state;
    const { login } = this.props;

    login(email, password)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async response => {
    if (response.error) {
      return this.handleError(response);
    }

    try {
      const { accessToken, refreshToken } = response.payload.data;

      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    } catch (err) {
      console.error(err);
    }

    // Triggers profile fetch and redirects to the dashboard screen:
    this.props.navigation.navigate(Routes.AUTH_LOADING);
  };

  handleError = async response => {
    const { data } = response.error.response;

    this.setState({
      error: getErrorsFromResponse(data, {
        password: null,
        email: null,
        other: null
      })
    });
  };

  navigateToRegister = () => {
    this.props.navigation.navigate(Routes.AUTH_REGISTER);
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <ImageBackground
          source={BackgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          <AuthHero style={styles.hero} />

          <ScrollView style={styles.loginContainer}>
            {error.other ? (
              <Error message={i18n.t("errors.auth.unauthorized")} />
            ) : null}

            <InputWithIcon
              iconName="ios-contact"
              iconSize={20}
              placeholder={i18n.t("auth.email")}
              value={email}
              error={error.email}
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
            />

            <InputWithIcon
              iconName="ios-lock"
              iconSize={20}
              placeholder={i18n.t("auth.password")}
              value={password}
              error={error.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              secureTextEntry
            />

            <AuthLoginScreenLinks
              loginWithFacebook={this.loginWithFacebook}
              loginWithGoogle={this.loginWithGoogle}
              navigateToRegister={this.navigateToRegister}
            />

            <Button
              title={i18n.t("auth.login")}
              onPress={this.loginWithCredentials}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export const AuthLoginScreenLinks = props => (
  <View>
    <View style={styles.loginContainerTextContainer}>
      <Text style={[styles.loginContainerText, styles.loginContainerTextA]}>
        {i18n.t("auth.loginWith")}
      </Text>

      <TouchableOpacity onPress={props.loginWithFacebook}>
        <Text
          style={[
            styles.loginContainerText,
            styles.loginContainerTextA,
            styles.loginProvider
          ]}
        >
          {" "}
          Facebook{"  "}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.loginContainerText, styles.loginContainerTextA]}>
        {i18n.t("auth.loginOr")}
      </Text>

      <TouchableOpacity onPress={props.loginWithGoogle}>
        <Text
          style={[
            styles.loginContainerText,
            styles.loginContainerTextA,
            styles.loginProvider
          ]}
        >
          {" "}
          Google.
        </Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={props.navigateToRegister}>
      <Text style={[styles.loginContainerText, styles.loginContainerTextB]}>
        {i18n.t("auth.dontHaveAccount")}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  hero: {
    paddingTop: 70,
    height: 460
  },

  loginProvider: {
    fontWeight: "900"
  },
  loginContainer: {
    marginHorizontal: 30,
    paddingTop: 15
  },
  loginContainerTextContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  loginContainerText: {
    color: colors.color,
    textAlign: "center"
  },
  loginContainerTextA: {
    fontSize: 14,

    marginTop: 15,
    marginBottom: 10
  },
  loginContainerTextB: {
    color: colors.info,
    fontSize: 12,

    marginTop: 10,
    marginBottom: 25
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen);
