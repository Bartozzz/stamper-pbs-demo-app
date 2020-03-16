import React from "react";
import { connect } from "react-redux";
import { Animated, StyleSheet, View } from "react-native";

import KeyboardAware from "../../components/helpers/KeyboardAware";
import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import Error from "../../components/Error";
import InputWithLabel from "../../components/forms/InputWithLabel";

import { changePassword } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");

class ProfilePasswordScreen extends React.Component {
  state = {
    processing: false,

    heightAnim: new Animated.Value(0),

    currPassword: null,
    newPasswordA: null,
    newPasswordB: null,

    error: {
      currPassword: null,
      newPasswordA: null,
      newPasswordB: null,
      other: null
    }
  };

  editPassword = () => {
    const { currPassword, newPasswordA, newPasswordB } = this.state;

    this.setState({ processing: true });

    this.props
      .changePassword(currPassword, newPasswordA, newPasswordB)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async () => {
    // Go back:
    this.props.navigation.navigate(Routes.INFO_SUCCESS, {
      redirect: Routes.PROFILE_MENU,
      message: i18n.t("success.changed")
    });
  };

  handleError = async response => {
    const { data } = response.error.response;

    const error = {
      currPassword: null,
      newPasswordA: null,
      newPasswordB: null
    };

    if (data.CurrentPassword) error.currPassword = data.CurrentPassword;
    if (data.NewPassword) error.newPasswordA = data.NewPassword;
    if (data.ConfirmNewPassword) error.newPasswordB = data.ConfirmNewPassword;
    if (data.Error) error.other = data.Error;
    // Returned by API:
    if (data[""]) error.currPassword = data[""];

    this.setState({ error, processing: false });
  };

  handleKeyboardShow = keyboardHeight => {
    Animated.timing(this.state.heightAnim, {
      toValue: keyboardHeight,
      duration: 250
    }).start();
  };

  handleKeyboardHide = () => {
    Animated.timing(this.state.heightAnim, {
      toValue: 0,
      duration: 250
    }).start();
  };

  render() {
    const { currPassword, newPasswordA, newPasswordB, error } = this.state;

    return (
      <KeyboardAware
        onKeyboardShow={this.handleKeyboardShow}
        onKeyboardHide={this.handleKeyboardHide}
      >
        {() => (
          <Background source={BackgroundImage}>
            <View style={styles.form}>
              {error.other ? <Error message={error.other} /> : null}

              <InputWithLabel
                label={i18n.t("profile.password.current")}
                value={currPassword}
                error={error.currPassword}
                onChangeText={currPassword => this.setState({ currPassword })}
                autoCapitalize="none"
                secureTextEntry
              />

              <InputWithLabel
                label={i18n.t("profile.password.password")}
                value={newPasswordA}
                error={error.newPasswordA}
                onChangeText={newPasswordA => this.setState({ newPasswordA })}
                autoCapitalize="none"
                secureTextEntry
              />

              <InputWithLabel
                label={i18n.t("profile.password.confirm")}
                value={newPasswordB}
                error={error.newPasswordB}
                onChangeText={newPasswordB => this.setState({ newPasswordB })}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={i18n.t("profile.save")}
                onPress={this.editPassword}
                processing={this.state.processing}
              />
            </View>

            <Animated.View style={[{ height: this.state.heightAnim }]} />
          </Background>
        )}
      </KeyboardAware>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginHorizontal: 30,

    justifyContent: "center"
  },

  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 30
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  changePassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePasswordScreen);
