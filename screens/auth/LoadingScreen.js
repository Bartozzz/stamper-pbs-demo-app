import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import { authorize, setAccessToken } from "../../store/reducers/auth";
import { EMAIL, getProfile } from "../../store/reducers/profile";
import { FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";
import * as Routes from "../../navigation";
import colors from "../../constants/Colors";
import styles from "../../constants/Styles";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { appToken, authorize } = this.props;

    if (appToken) {
      this.navigateToApp();
    } else {
      authorize()
        .then(() => this.navigateToApp())
        .catch(err => console.log(err));
    }
  }

  navigateToApp() {
    const { appToken, accessToken, refreshToken } = this.props;

    if (accessToken && refreshToken) {
      console.log("Got user access token and refresh token…");

      // Required, so user's access token doesn't gets overrided by app's access
      // token from AuthLoadingScreen's componentDidMount:
      this.props.setAccessToken(accessToken);

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props
        .getProfile()
        .then(this.handleAuthorized)
        .catch(this.handleUnauthorized);
    } else if (appToken) {
      console.log("User access & refresh token not found, setting app token…");
      // If the user is not logged-in, we probably want to use the app internal
      // access token (for endpoints like login etc.):
      this.props.setAccessToken(appToken);
      this.handleUnauthorized();
    }
  }

  handleAuthorized = async response => {
    const { navigation } = this.props;

    try {
      if (response.payload.data.email) {
        await AsyncStorage.setItem(EMAIL, response.payload.data.email);

        // When the user logs-in, force the refresh of offline-first elements:
        await AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));
        await AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
      }
    } catch (error) {
      console.log(error);
    }

    const redirect = navigation.getParam("redirect", Routes.DASHBOARD);

    return navigation.navigate(redirect);
  };

  handleUnauthorized = async error => {
    if (error) {
      console.log(error);
    }

    return this.props.navigation.navigate(Routes.AUTH);
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  appToken: state.auth.appToken,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken
});

const mapDispatchToProps = {
  authorize,
  getProfile,
  setAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
