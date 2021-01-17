import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Analytics from "expo-firebase-analytics";

import {
  parseJwt,
  logInWithGoogle,
  logInWithFacebook,
  logInWithApple,
} from "../../../helpers/auth";
import { getErrorsFromResponse } from "../../../helpers/errors";
import config from "../../../constants/welcomescreen-config";

import Background from "../../../components/Background";
import WelcomeItem from "../../../components/WelcomeItem";
import WelcomeButtons from "../../../components/WelcomeButtons";

import {
  loginExternal,
  loginApple,
  setNotificationsToken,
  registerExternal,
  registerApple,
} from "../../../store/reducers/auth";

import registerForPushNotificationsAsync from "../../../helpers/registerForPushNotifications";

import * as Routes from "../../../navigation";
import defaultStyles from "../../../constants/Styles";
import theme from "../../../constants/theme";

import images from "../../../constants/images";

class AuthWelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    active: 0,
    error: {
      password: null,
      email: null,
      other: null,
    },

    expoToken: null,
  };

  loginWithApple = async () => {
    this.setState({ processing: true });

    logInWithApple(
      (user) => {
        const email = user.email;
        const token = user.identityToken;

        if (email) {
          const username = email.split("@")[0];

          this.props
            .registerApple(email, token, username)
            .then((response) => {
              // Require user to accepts the terms of service. The registeration
              // already logs the user in, so calling `loginExternal` will fail:
              this.props.navigation.navigate(Routes.AUTH_EXTERNAL_TOS, {
                onAccept: () => this.handleSuccess(true)(response),
              });
              Analytics.logEvent("sign_up", {
                method: "apple",
              });
            })
            .catch((e) => {
              const data = parseJwt(token);
              this.loginExternal(data.email, "apple");
            });
        } else {
          const data = parseJwt(token);
          this.loginExternal(data.email, "apple");
        }
      },
      (error) => {
        this.setState({
          processing: false,
          error: { ...this.state.error, other: error },
        });
      }
    );
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
      .then((response) => {
        this.handleSuccess(firstLogin)(response);
        Analytics.logEvent("login", {
          method: method,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  handleSuccess = (firstLogin) => async (response) => {
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
        <Background source={images.BackgroundPasswordWn} disableScroll>
          <Carousel
            ref={(carousel) => (this.carouselRef = carousel)}
            data={config}
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
            dotColor={theme.colors.primary}
            inactiveDotColor={theme.colors.primary}
            inactiveDotOpacity={0.2}
            inactiveDotScale={1}
          />
          <WelcomeButtons
            loginWithApple={this.loginWithApple}
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
    paddingVertical: "5%",
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  loginExternal,
  loginApple,
  setNotificationsToken,
  registerExternal,
  registerApple,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWelcomeScreen);
