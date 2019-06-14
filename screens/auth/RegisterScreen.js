import React from "react";
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
import AuthHero from "../../components/screens/auth/Hero";
import Button from "../../components/forms/Button";
import InputWithIcon from "../../components/forms/InputWithIcon";
import HeaderBackIcon from "../../components/nav/HeaderBack";

import {
  register,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import { getErrorsFromResponse } from "../../helpers/errors";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

class AuthRegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.auth.register"),
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
    )
  });

  state = {
    processing: false,

    topAnim: new Animated.Value(0),

    nickname: __DEV__ ? "testing" : null,
    password: __DEV__ ? "Test1234+" : null,
    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      nickname: [],
      password: [],
      email: [],
      other: []
    }
  };

  registerWithCredentials = () => {
    this.setState({ processing: true });

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
      console.log(err);
    }

    // Triggers profile fetch and redirects to the newsletter update screen:
    this.props.navigation.navigate(Routes.AUTH_LOADING, {
      redirect: Routes.PROFILE_NEWSLETTER_UPDATE
    });
  };

  handleError = async response => {
    const { data } = response.error.response;

    this.setState({
      processing: false,
      error: getErrorsFromResponse(data, {
        nickname: null,
        password: null,
        email: null,
        other: null
      })
    });
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.AUTH_TOS);
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
    const { topAnim, nickname, password, email, error } = this.state;

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
                <ScrollView style={styles.regContainer}>
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
                    processing={this.state.processing}
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

export const AuthRegisterScreenLinks = props => (
  <View style={styles.regContainerTextContainer}>
    <Text style={[styles.regContainerText]}>{i18n.t("auth.tosAccept")}</Text>

    <TouchableOpacity onPress={props.navigateToTOS}>
      <Text style={[styles.regContainerText, styles.regBold]}>
        {" "}
        {i18n.t("auth.tos")}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    minHeight: 230,
    maxHeight: Math.max(250, (Dimensions.get("window").height - 170) / 2)
  },

  regBold: {
    fontWeight: "900"
  },
  regContainer: {
    marginHorizontal: 30,
    paddingTop: 15
  },
  regContainerTextContainer: {
    marginTop: 3,
    marginBottom: 15,

    flexDirection: "row",
    alignSelf: "center"
  },
  regContainerText: {
    fontSize: 14,

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
