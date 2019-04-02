import React from "react";
import { Facebook, Google } from "expo";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Background from "../../components/Background";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";

import {
  login,
  loginExternal,
  registerExternal,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import { getErrorsFromResponse } from "../../helpers/errors";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isKeyboardVisible: false,

    password: __DEV__ ? "Test1234+" : null,
    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      password: null,
      email: null,
      other: null
    }
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.handleKeyboardShow
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.handleKeyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardShow = () => {
    this.setState({
      isKeyboardVisible: true
    });
  };

  handleKeyboardHide = () => {
    this.setState({
      isKeyboardVisible: false
    });
  };

  loginExternal = email => {
    this.props
      .loginExternal(email)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  loginWithFacebook = async () => {
    const { registerExternal } = this.props;

    const fetchUser = async token => {
      const endpoint = "https://graph.facebook.com/me?fields=email";

      // Get the user's email using Facebook's Graph API:
      const resp = await fetch(`${endpoint}&access_token=${token}`);
      const data = await resp.json();

      return data;
    };

    try {
      const fid = "858778281140242";
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(fid);

      if (type === "success") {
        const user = await fetchUser(token);

        registerExternal(user.email, "facebook", user.email.split("@")[0])
          .then(() => this.loginExternal(user.email))
          .catch(() => this.loginExternal(user.email));
      }
    } catch (e) {
      this.setState({
        error: {
          ...this.state.error,
          other: "Facebook error"
        }
      });
    }
  };

  loginWithGoogle = async () => {
    const { registerExternal } = this.props;

    try {
      const clientId =
        "802676794484-4hur6ue6ionheedpb8mt294t8flj175a.apps.googleusercontent.com";
      const { type, user } = await Google.logInAsync({ clientId });

      if (type === "success") {
        registerExternal(user.email, "google", user.email.split("@")[0])
          .then(() => this.loginExternal(user.email))
          .catch(() => this.loginExternal(user.email));
      }
    } catch (e) {
      this.setState({
        error: {
          ...this.state.error,
          other: "Google error"
        }
      });
    }
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
      console.log(err);
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

  navigateToResetPassword = () => {
    this.props.navigation.navigate(Routes.AUTH_RESET);
  };

  render() {
    const { isKeyboardVisible, email, password, error } = this.state;

    return (
      <KeyboardAvoidingView style={defaultStyles.grow} behavior="padding">
        <Background source={BackgroundImage} disableScroll>
          <AuthHero
            style={[styles.hero, isKeyboardVisible && { display: "none" }]}
          />

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
              navigateToResetPassword={this.navigateToResetPassword}
            />

            <Button
              title={i18n.t("auth.login")}
              onPress={this.loginWithCredentials}
            />
          </ScrollView>
        </Background>
      </KeyboardAvoidingView>
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

    <View style={defaultStyles.row}>
      <TouchableOpacity onPress={props.navigateToRegister}>
        <Text style={[styles.loginContainerText, styles.loginContainerTextB]}>
          {i18n.t("auth.dontHaveAccount")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.navigateToResetPassword}>
        <Text style={[styles.loginContainerText, styles.loginContainerTextB]}>
          {" "}
          {i18n.t("auth.forgotPassword")}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    minHeight: 280,
    maxHeight: Math.max(340, (Dimensions.get("window").height - 170) / 2)
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

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  login,
  loginExternal,
  registerExternal
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen);
