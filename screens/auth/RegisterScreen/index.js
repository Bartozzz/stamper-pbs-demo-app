import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import registerForPushNotificationsAsync from "../../../helpers/registerForPushNotifications";

import * as Styled from "./index.styled";
import Theme from "./index.theme";

import Background from "../../../components/Background";

import Button from "../../../components/Button";
import InputWithIcon from "../../../components/InputWithIcon";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderBack from "../../../components/HeaderBack";

import { register, setNotificationsToken } from "../../../store/reducers/auth";

import i18n from "../../../translations";
import * as Routes from "../../../navigation";
import defaultStyles from "../../../constants/Styles";
import { getErrorsFromResponse } from "../../../helpers/errors";

import images from "../../../constants/images";

class AuthRegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.auth.register"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack navigation={navigation} onPress={() => navigation.goBack()} />
    ),
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    processing: false,

    nickname: __DEV__ ? "testing" : null,
    password: __DEV__ ? "Test1234+" : null,
    email: __DEV__ ? "testing@test.pl" : null,

    error: {
      nickname: [],
      password: [],
      email: [],
      other: [],
    },

    expoToken: null,
  };

  registerWithCredentials = () => {
    this.setState({ processing: true });

    const { email, password, nickname } = this.state;

    this.props
      .register(email, password, nickname)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async (response) => {
    if (response.error) {
      return this.handleError(response);
    }

    try {
      if (this.state.expoToken) {
        this.props.setNotificationsToken(this.state.expoToken);
      }
    } catch (err) {
      console.log(err);
    }

    // Triggers profile fetch and redirects to the newsletter update screen:
    this.props.navigation.navigate(Routes.AUTH_LOADING, {
      redirect: Routes.PROFILE_NEWSLETTER_UPDATE,
    });
    Analytics.logEvent("sign_up", {
      method: "email",
    });
  };

  handleError = async (response) => {
    const { data } = response.error.response;

    this.setState({
      processing: false,
      error: getErrorsFromResponse(data, {
        nickname: null,
        password: null,
        email: null,
        other: null,
      }),
    });
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.AUTH_TOS);
  };

  componentDidMount() {
    registerForPushNotificationsAsync().then((token) =>
      this.setState({ expoToken: token })
    );
  }

  render() {
    const { nickname, password, email, error } = this.state;

    return (
      <Theme>
        <Background source={images.BackgroundPasswordWn} disableScroll>
          <Styled.Container enableOnAndroid={true} extraScrollHeight={60}>
            <InputWithIcon
              iconName="ios-contact"
              iconSize={20}
              placeholder={i18n.t("auth.nickname")}
              value={nickname}
              error={error.nickname}
              onChangeText={(nickname) => this.setState({ nickname })}
              autoCapitalize="none"
            />

            <InputWithIcon
              iconName="ios-at"
              iconSize={20}
              placeholder={i18n.t("auth.email")}
              value={email}
              error={error.email}
              onChangeText={(email) => this.setState({ email })}
              autoCapitalize="none"
            />

            <InputWithIcon
              iconName="ios-lock"
              iconSize={20}
              placeholder={i18n.t("auth.password")}
              value={password}
              error={error.password}
              onChangeText={(password) => this.setState({ password })}
              autoCapitalize="none"
              secureTextEntry
            />

            <AuthRegisterScreenLinks navigateToTOS={this.navigateToTOS} />

            <Button
              title={i18n.t("auth.register")}
              onPress={this.registerWithCredentials}
              processing={this.state.processing}
            />
          </Styled.Container>
        </Background>
      </Theme>
    );
  }
}

export const AuthRegisterScreenLinks = (props) => (
  <Styled.TextContainer>
    <Styled.Text>{i18n.t("auth.tosAccept")}</Styled.Text>

    <TouchableOpacity onPress={props.navigateToTOS}>
      <Styled.Text bold> {i18n.t("auth.tos")}</Styled.Text>
    </TouchableOpacity>
  </Styled.TextContainer>
);

const mapStateToProps = (state) => ({
  // …
  loading: state.auth.fetchingData,
});

const mapDispatchToProps = {
  // …,
  register,
  setNotificationsToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegisterScreen);
