import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import { authorize, setAccessToken } from "../../store/reducers/auth";
import { EMAIL, getProfile } from "../../store/reducers/profile";
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
    const { email, appToken, accessToken, refreshToken } = this.props;

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
    try {
      if (response.payload.data.email) {
        await AsyncStorage.setItem(EMAIL, response.payload.data.email);
      }
    } catch (error) {
      console.error(error);
    }

    return this.props.navigation.navigate(Routes.DASHBOARD);
  };

  handleUnauthorized = async err => {
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
  // …
  email: state.profile.email,
  appToken: state.auth.appToken,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken
});

const mapDispatchToProps = {
  // …
  authorize,
  getProfile,
  setAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
