import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  AsyncStorage,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Analytics from "expo-firebase-analytics";

import { logInWithGoogle, logInWithFacebook } from "../../helpers/auth";
import { getErrorsFromResponse } from "../../helpers/errors";

import Background from "../../components/Background";
import WelcomeItem from "../../components/WelcomeItem";
import WelcomeButtons from "../../components/WelcomeButtons";

import {
  loginExternal,
  setNotificationsToken,
  registerExternal,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../store/reducers/auth";

import registerForPushNotificationsAsync from "../../helpers/registerForPushNotifications";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/password_wn.png");

const WelcomePicture1 = require("../../assets/images/welcome/1.png");
const WelcomePicture1Sygnet = require("../../assets/logos/stamper_sygnet_300px.png");
const WelcomePicture2 = require("../../assets/images/welcome/2.png");
const WelcomePicture3 = require("../../assets/images/welcome/3.png");
const WelcomePicture4 = require("../../assets/images/welcome/4.png");

class AuthWelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    active: 0,
    entries: [
      {
        background: WelcomePicture1,
        image: WelcomePicture1Sygnet,
        width: 70,
        flex: 0.5,
        title: i18n.t("welcome.title1"),
        subtitle: i18n.t("welcome.subtitle1"),
      },
      {
        image: WelcomePicture2,
        title: i18n.t("welcome.title2"),
        subtitle: i18n.t("welcome.subtitle2"),
      },
      {
        image: WelcomePicture3,
        title: i18n.t("welcome.title3"),
        subtitle: i18n.t("welcome.subtitle3"),
      },
      {
        image: WelcomePicture4,
        title: i18n.t("welcome.title4"),
        subtitle: i18n.t("welcome.subtitle4"),
      },
    ],
    error: {
      password: null,
      email: null,
      other: null,
    },

    expoToken: null,
  };

  loginWithFacebook = async () => {
    this.setState({ processing: true });

    logInWithFacebook(
      (user) => {
        const email = user.email;
        const username = email.split("@")[0];

        this.props
          .registerExternal(email, "facebook", username)
          .then((response) => {
            // Require user to accepts the terms of service. The registeration
            // already logs the user in, so calling `loginExternal` will fail:
            this.props.navigation.navigate(Routes.AUTH_EXTERNAL_TOS, {
              onAccept: () => this.handleSuccess(true)(response),
            });
            Analytics.logEvent("sign_up", {
              method: "facebook",
            });
          })
          .catch(() => {
            this.loginExternal(email, "facebook");
          });
      },
      (error) => {
        this.setState({
          processing: false,
          error: { ...this.state.error, other: error },
        });
      }
    );
  };

  loginWithGoogle = async () => {
    this.setState({ processing: true });

    logInWithGoogle(
      (user) => {
        const email = user.email;
        const username = email.split("@")[0];

        this.props
          .registerExternal(email, "google", username)
          .then((response) => {
            // Require user to accepts the terms of service. The registeration
            // already logs the user in, so calling `loginExternal` will fail:
            this.props.navigation.navigate(Routes.AUTH_EXTERNAL_TOS, {
              onAccept: () => this.handleSuccess(true)(response),
            });
            Analytics.logEvent("sign_up", {
              method: "google",
            });
          })
          .catch(() => {
            this.loginExternal(email, "google");
          });
      },
      (error) => {
        this.setState({
          processing: false,
          error: { ...this.state.error, other: error },
        });
      }
    );
  };

  loginExternal = (email, method, firstLogin = false) => {
    this.props
      .loginExternal(email)
      .then(() => {
        this.handleSuccess(firstLogin);
        Analytics.logEvent("login", {
          method: method,
        });
      })
      .catch(this.handleError);
  };

  handleSuccess = (firstLogin) => async (response) => {
    if (response.error) {
      return this.handleError(response);
    }

    try {
      const { accessToken, refreshToken } = response.payload.data;

      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
      if (this.state.expoToken) {
        this.props.setNotificationsToken(this.state.expoToken);
      }
    } catch (err) {
      console.log(err);
    }

    // Triggers profile fetch:
    this.props.navigation.navigate(Routes.AUTH_LOADING, {
      redirect: firstLogin
        ? Routes.PROFILE_NEWSLETTER_UPDATE
        : Routes.DASHBOARD,
    });
  };

  handleError = async (response) => {
    const { data } = response.error.response;

    this.setState({
      processing: false,
      error: getErrorsFromResponse(data, {
        password: null,
        email: null,
        other: null,
      }),
    });
  };

  componentDidMount() {
    registerForPushNotificationsAsync().then((token) =>
      this.setState({ expoToken: token })
    );
  }

  render() {
    const { active } = this.state;
    return (
      <SafeAreaView style={defaultStyles.container}>
        <Background source={BackgroundImage} disableScroll>
          <Carousel
            ref={(carousel) => (this.carouselRef = carousel)}
            data={this.state.entries}
            renderItem={({ item }) => (
              <WelcomeItem
                background={item.background}
                image={item.image}
                width={item.width}
                flex={item.flex}
                title={item.title}
                subtitle={item.subtitle}
              />
            )}
            inactiveSlideOpacity={0}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            onSnapToItem={(index) => this.setState({ active: index })}
            loop={true}
          />
          <Pagination
            dotsLength={4}
            carouselRef={this.carouselRef}
            activeDotIndex={active}
            dotStyle={styles.paginationDot}
            containerStyle={styles.paginationContainer}
            dotColor={colors.primary}
            inactiveDotColor={colors.primary}
            inactiveDotOpacity={0.2}
            inactiveDotScale={1}
          />
          <WelcomeButtons
            loginWithGoogle={this.loginWithGoogle}
            loginWithFacebook={this.loginWithFacebook}
            login={() => {
              this.props.navigation.navigate(Routes.AUTH_LOGIN);
            }}
            register={() => {
              this.props.navigation.navigate(Routes.AUTH_REGISTER);
            }}
          />
        </Background>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  paginationDot: {
    height: 12,
    width: 12,
    borderRadius: 12,
  },
  paginationContainer: {
    alignItems: "flex-start",
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  loginExternal,
  setNotificationsToken,
  registerExternal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWelcomeScreen);
