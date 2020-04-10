import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import Background from "../../components/Background";

import Button from "../../components/forms/Button";
import InputWithIcon from "../../components/forms/InputWithIcon";
import HeaderBackIcon from "../../components/nav/HeaderBack";

import {
  login,
  loginExternal,
  registerExternal,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import HeaderTitle from "../../components/nav/HeaderTitle";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import { getErrorsFromResponse } from "../../helpers/errors";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class AuthLoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: i18n.t("navigation.auth.login"),
    headerTitle: HeaderTitle,
    headerLeft: <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    processing: false,

    password: __DEV__ ? "Test1234+" : null,
    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      password: null,
      email: null,
      other: null
    }
  };

  loginWithCredentials = () => {
    this.setState({ processing: true });

    const { email, password } = this.state;

    this.props
      .login(email, password)
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

    // Triggers profile fetch:
    this.props.navigation.navigate(Routes.AUTH_LOADING, {
      redirect: firstLogin ? Routes.PROFILE_NEWSLETTER_UPDATE : Routes.DASHBOARD
    });
  };

  handleError = async response => {
    const { data } = response.error.response;

    this.setState({
      processing: false,
      error: getErrorsFromResponse(data, {
        password: null,
        email: null,
        other: null
      })
    });
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <Background source={BackgroundImage} disableScroll>
          <ScrollView style={styles.loginContainer}>
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

            <View style={styles.loginContainerTextContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Routes.AUTH_REGISTER);
                }}
              >
                <Text
                  style={[
                    styles.loginContainerText,
                    styles.loginContainerTextB
                  ]}
                >
                  {i18n.t("auth.dontHaveAccount")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Routes.AUTH_RESET);
                }}
              >
                <Text
                  style={[
                    styles.loginContainerText,
                    styles.loginContainerTextB
                  ]}
                >
                  {" "}
                  {i18n.t("auth.forgotPassword")}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title={i18n.t("auth.login")}
              onPress={this.loginWithCredentials}
              processing={this.state.processing}
            />
          </ScrollView>
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

    marginTop: 20,
    marginBottom: 30
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
