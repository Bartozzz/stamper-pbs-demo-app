import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
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
import HeaderBackIcon from "../../components/nav/HeaderBack";

import { resetPassword } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class ResetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.auth.forgot"),
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
    )
  });

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
            style={[styles.hero /*isKeyboardVisible && { display: "none" }*/]}
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
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t("auth.resetPassword")}
              onPress={this.resetPassword}
            />
          </View>
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

  loginContainer: {
    flex: 1,

    marginHorizontal: 30,
    paddingTop: 15
  },

  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24
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
