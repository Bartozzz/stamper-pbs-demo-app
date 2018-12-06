import React from "react";
import { Provider } from "react-redux";
import { AppLoading, Asset, Font, Icon } from "expo";
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import AppContainer from "./navigation/AppNavigator";
import colors from "./constants/Colors";
import configureStore from "./store";
import { QRDATA_URL, setUrl } from "./store/reducers/qrdata";

// Redux store:
const store = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <AppContainer />
        </View>
      </Provider>
    );
  }

  _loadStorageAsync = async () => {
    try {
      const url = await AsyncStorage.getItem(QRDATA_URL);

      if (url !== null) {
        store.dispatch(setUrl(url));
      }
    } catch (err) {
      // Silent error…
    }
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Local storage (redux):
      this._loadStorageAsync(),

      // Preload assets:
      Asset.loadAsync([
        // …
        require("./assets/images/qr.png")
      ]),

      // Load fonts:
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "poppins-black": require("./assets/fonts/Poppins-Black.otf"),
        "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
