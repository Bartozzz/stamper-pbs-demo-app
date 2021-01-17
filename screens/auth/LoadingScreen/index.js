import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { authorize, setAccessToken } from "../../../store/reducers/auth";
import { getProfile } from "../../../store/reducers/profile";
import * as Routes from "../../../navigation";
import theme from "../../../constants/theme";
import styles from "../../../constants/Styles";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        const { appToken } = this.props;
        if (appToken) {
          this.navigateToApp(state.isInternetReachable);
        } else {
          this.props
            .authorize()
            .then(() => this.navigateToApp(state.isInternetReachable))
            .catch((err) => console.log(err));
        }
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  navigateToApp(isInternetReachable) {
    const { appToken, accessToken, refreshToken } = this.props;

    if (accessToken && refreshToken) {
      // Required, so user's access token doesn't gets overrided by app's access
      // token from AuthLoadingScreen's componentDidMount:

      if (isInternetReachable) {
        this.props.setAccessToken(accessToken);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props
          .getProfile()
          .then(this.handleAuthorized)
          .catch(this.handleUnauthorized);
      } else {
        // Open the App if the user is logged in, and he's offline
        this.props.setAccessToken(accessToken);
        this.handleAuthorized();
      }
    } else if (appToken) {
      // If the user is not logged-in, we probably want to use the app internal
      // access token (for endpoints like login etc.):
      this.props.setAccessToken(appToken);
      this.handleUnauthorized();
    }
  }

  handleAuthorized = async (response) => {
    const { navigation } = this.props;
    const nextScreen = navigation.getParam("redirect", Routes.APP);

    return navigation.navigate(nextScreen);
  };

  handleUnauthorized = async (error) => {
    if (error) {
      console.log(error);
    }

    return this.props.navigation.navigate(Routes.AUTH);
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  appToken: state.auth.appToken,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

const mapDispatchToProps = {
  authorize,
  getProfile,
  setAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
