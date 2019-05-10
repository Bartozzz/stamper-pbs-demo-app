import React from "react";
import { Facebook, Google, Constants } from "expo";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions
} from "react-native";
import Background from "../../components/Background";

import KeyboardAware from "../../components/helpers/KeyboardAware";
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

const heroMinWidth = 280;
const heroMaxWidth = Math.max(340, (Dimensions.get("window").height - 170) / 2);

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    topAnim: new Animated.Value(0),

    password: __DEV__ ? "Test1234+" : null,
    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      password: null,
      email: null,
      other: null
    }
  };

  loginExternal = (email, firstLogin = false) => {
    this.props
      .loginExternal(email)
      .then(this.handleSuccess(firstLogin))
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
      const fid = Constants.manifest.extra.FACEBOOK_APP_ID;
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(fid);

      if (type === "success") {
        const user = await fetchUser(token);

        registerExternal(user.email, "facebook", user.email.split("@")[0])
          .then(() => {
            this.props.navigation.navigate(Routes.AUTH_EXTERNAL_TOS, {
              onAccept: () => {
                this.loginExternal(user.email, true);
              }
            });
          })
          .catch(() => {
            this.loginExternal(user.email);
          });
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
      const clientId = Constants.manifest.extra.GOOGLE_CLIENT_ID;
      const { type, user } = await Google.logInAsync({ clientId });

      if (type === "success") {
        registerExternal(user.email, "google", user.email.split("@")[0])
          .then(() => {
            this.props.navigation.navigate(Routes.AUTH_EXTERNAL_TOS, {
              onAccept: () => {
                this.loginExternal(user.email, true);
              }
            });
          })
          .catch(() => {
            this.loginExternal(user.email);
          });
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
      .then(this.handleSuccess(false))
      .catch(this.handleError);
  };

  handleSuccess = firstLogin => async response => {
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
    this.props.navigation.navigate(Routes.AUTH_LOADING, {
      redirect: firstLogin ? Routes.PROFILE_NEWSLETTER_UPDATE : Routes.DASHBOARD
    });
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

  handleKeyboardShow = keyboardHeight => {
    Animated.timing(this.state.topAnim, {
      toValue: -keyboardHeight,
      duration: 250
    }).start();
  };

  handleKeyboardHide = () => {
    Animated.timing(this.state.topAnim, {
      toValue: 0,
      duration: 250
    }).start();
  };

  render() {
    const { topAnim, email, password, error } = this.state;

    return (
      <KeyboardAware
        onKeyboardShow={this.handleKeyboardShow}
        onKeyboardHide={this.handleKeyboardHide}
      >
        {() => (
          <View style={defaultStyles.container}>
            <AuthHero style={[styles.hero]} />

            <Animated.View style={[{ height: 350 }, { top: topAnim }]}>
              <Background source={BackgroundImage} disableScroll>
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
            </Animated.View>
          </View>
        )}
      </KeyboardAware>
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
    minHeight: heroMinWidth,
    maxHeight: heroMaxWidth
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
