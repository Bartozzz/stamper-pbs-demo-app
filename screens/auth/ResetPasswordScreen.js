import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Background from "../../components/Background";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";

import { resetPassword } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class ResetPasswordScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.auth.forgot")
  };

  state = {
    isKeyboardVisible: false,

    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      email: null
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

  resetPassword = () => {
    this.props
      .resetPassword(this.state.email)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async response => {
    if (response.error) {
      return this.handleError(response);
    }

    this.props.navigation.navigate(Routes.INFO_SUCCESS);
  };

  handleError = async () => {
    this.props.navigation.navigate(Routes.INFO_ERROR);
  };

  render() {
    const { isKeyboardVisible, email, error } = this.state;

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

            <Button
              title={i18n.t("auth.resetPassword")}
              onPress={this.resetPassword}
            />
          </ScrollView>
        </Background>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    minHeight: 230,
    maxHeight: Math.max(250, (Dimensions.get("window").height - 170) / 2)
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
  resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ResetPasswordScreen
);
