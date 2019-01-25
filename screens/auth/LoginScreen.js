import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  View
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

    const error = {
      password: null,
      email: null,
      other: null
    };

    if (data.Password) error.password = data.Password;
    if (data.Email) error.email = data.Email;
    if (data.Error) error.other = data.Error;

    this.setState({ error });
  };

  navigateToRegister = () => {
    this.props.navigation.navigate(Routes.AUTH_REGISTER);
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <AuthHero style={styles.hero} />

        <ScrollView style={styles.loginContainer}>
          {error.other ? <Error message={error.other} /> : null}

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
        {i18n.t("auth.register")}
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
    marginHorizontal: 30
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
    fontSize: 16,

    marginTop: 15,
    marginBottom: 10
  },
  loginContainerTextB: {
    fontSize: 20,
    fontWeight: "900",

    marginTop: 15,
    marginBottom: 30
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
