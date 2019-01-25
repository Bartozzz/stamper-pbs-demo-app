import React from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";

import {
  register,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class AuthRegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.auth.register")
  });

  state = {
    // nickname: null,
    // password: null,
    // email: null,
    nickname: "testing",
    password: "Test1234+",
    email: "testing@test.pl",

    error: {
      nickname: [],
      password: [],
      email: [],
      other: []
    }
  };

  registerWithCredentials = () => {
    const { email, password, nickname } = this.state;
    const { register } = this.props;

    register(email, password, nickname)
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
      nickname: null,
      password: null,
      email: null,
      other: null
    };

    if (data.Nickname) error.nickname = data.Nickname;
    if (data.Password) error.password = data.Password;
    if (data.Email) error.email = data.Email;
    if (data.Error) error.other = data.Error;

    this.setState({ error });
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.AUTH_TOS);
  };

  render() {
    const { nickname, password, email, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <AuthHero />

        <ScrollView style={styles.regContainer}>
          {error.other ? <Error message={error.other} /> : null}

          <InputWithIcon
            iconName="ios-contact"
            iconSize={20}
            placeholder={i18n.t("auth.nickname")}
            value={nickname}
            error={error.nickname}
            onChangeText={nickname => this.setState({ nickname })}
            autoCapitalize="none"
          />

          <InputWithIcon
            iconName="ios-at"
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

          <AuthRegisterScreenLinks navigateToTOS={this.navigateToTOS} />

          <Button
            title={i18n.t("auth.register")}
            onPress={this.registerWithCredentials}
          />
        </ScrollView>
      </View>
    );
  }
}

export const AuthRegisterScreenLinks = props => (
  <View style={styles.regContainerTextContainer}>
    <Text style={[styles.regContainerText, styles.regContainerTextA]}>
      {i18n.t("auth.tosAccept")}
    </Text>

    <TouchableOpacity onPress={props.navigateToTOS}>
      <Text style={[styles.regContainerText, styles.regBold]}>
        {i18n.t("auth.tos")}
        {"  "}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  regBold: {
    fontWeight: "900"
  },
  regContainer: {
    marginHorizontal: 30
  },
  regContainerTextContainer: {
    marginTop: 10,
    marginBottom: 25,

    flexDirection: "row",
    alignSelf: "center"
  },
  regContainerText: {
    fontSize: 16,

    color: colors.color,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  // …
  loading: state.auth.fetchingData
});

const mapDispatchToProps = {
  // …,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegisterScreen);
