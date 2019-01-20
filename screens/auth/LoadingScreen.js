import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";

import * as Routes from "../../navigation";
import colors from "../../constants/Colors";

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? Routes.DASHBOARD : Routes.AUTH);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthLoadingScreen;
