import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, AsyncStorage, View } from "react-native";

import { authorize } from "../../store/reducers/auth";
import * as Routes from "../../navigation";
import colors from "../../constants/Colors";
import styles from "../../constants/Styles";

class AuthLoadingScreen extends React.Component {
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
    const { accessToken } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      accessToken ? Routes.DASHBOARD : Routes.AUTH
    );
  }

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
  appToken: state.auth.appToken,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken
});

const mapDispatchToProps = {
  // …
  authorize
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
