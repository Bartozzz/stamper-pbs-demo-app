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

import KeyboardAware from "../../components/helpers/KeyboardAware";
import AuthHero from "../../components/screens/auth/Hero";
import Button from "../../components/forms/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/forms/InputWithIcon";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import HeaderTitle from "../../components/nav/HeaderTitle";

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
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
    ),
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    processing: false,

    topAnim: new Animated.Value(0),

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
    const { topAnim, email, error } = this.state;

    return (
      <KeyboardAware
        onKeyboardShow={this.handleKeyboardShow}
        onKeyboardHide={this.handleKeyboardHide}
      >
        {() => (
          <View style={defaultStyles.container}>
            <AuthHero style={[styles.hero]} />

            <Animated.View
              style={[{ flex: 1 }, { minHeight: 350 }, { top: topAnim }]}
            >
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
                </ScrollView>

                <View style={styles.buttonContainer}>
                  <Button
                    title={i18n.t("auth.resetPassword")}
                    onPress={this.resetPassword}
                    processing={this.state.processing}
                  />
                </View>
              </Background>
            </Animated.View>
          </View>
        )}
      </KeyboardAware>
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
