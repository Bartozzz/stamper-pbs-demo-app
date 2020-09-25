import React from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView } from "react-native";
import * as Analytics from "expo-firebase-analytics";
import Background from "../../components/Background";

import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";
import HeaderTitle from "../../components/HeaderTitle";
import HeaderBack from "../../components/HeaderBack";

import { resetPassword } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class ResetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.auth.forgot"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack navigation={navigation} onPress={() => navigation.goBack()} />
    ),
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    processing: false,

    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      email: null,
    },
  };

  resetPassword = () => {
    this.setState({ processing: true });

    this.props
      .resetPassword(this.state.email)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async (response) => {
    if (response.error) {
      return this.handleError(response);
    }

    this.setState({ processing: false });
    this.props.navigation.navigate(Routes.INFO_SUCCESS);
    Analytics.logEvent("reset_password");
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
            onChangeText={(email) => this.setState({ email })}
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
    paddingTop: 15,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  resetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
