import React from "react";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from "react-native";
import Background from "../../components/Background";

import Button from "../../components/forms/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/forms/InputWithIcon";
import { resetPassword } from "../../store/reducers/auth";

import i18n from "../../translations";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class ResetPasswordScreen extends React.Component {
  state = {
    processing: false,

    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      email: null
    }
  };

  resetPassword = () => {
    this.setState({ processing: true });

    this.props
      .resetPassword(this.state.email)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async response => {
    if (response.error) {
      return this.handleError(response);
    }

    this.setState({ processing: false });
    this.props.navigation.navigate(Routes.INFO_SUCCESS);
  };

  handleError = async () => {
    this.setState({ processing: false });
    this.props.navigation.navigate(Routes.INFO_ERROR);
  };

  render() {
    const { email, error } = this.state;

    return (
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

          <Button
            title={i18n.t("auth.resetPassword")}
            onPress={this.resetPassword}
            processing={this.state.processing}
          />
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    marginHorizontal: 30,
    paddingTop: 15
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  resetPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
