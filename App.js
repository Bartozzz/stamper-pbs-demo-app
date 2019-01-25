import React from "react";
import { Provider } from "react-redux";
import { AppLoading, Asset, Font, Icon } from "expo";
import { AsyncStorage, Platform, StatusBar } from "react-native";
import AppContainer from "./navigation/AppNavigator";
import configureStore from "./store";
import { EMAIL, setEmail } from "./store/reducers/profile";
import { QRDATA_URL, setUrl } from "./store/reducers/qrdata";
import {
  EXPIRY_DATE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  setExpiryDate,
  setAccessToken,
  setRefreshToken
} from "./store/reducers/auth";

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
        <React.Fragment>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <AppContainer />
        </React.Fragment>
      </Provider>
    );
  }

  _loadStorageAsync = async () => {
    try {
      const url = await AsyncStorage.getItem(QRDATA_URL);
      const email = await AsyncStorage.getItem(EMAIL);
      const expiryDate = await AsyncStorage.getItem(EXPIRY_DATE);
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

      if (url !== null) {
        store.dispatch(setUrl(url));
      }

      if (email !== null) {
        store.dispatch(setEmail(email));
      }

      if (expiryDate !== null) {
        store.dispatch(setExpiryDate(expiryDate));
      }

      if (accessToken !== null) {
        store.dispatch(setAccessToken(accessToken));
      }

      if (refreshToken !== null) {
        store.dispatch(setRefreshToken(refreshToken));
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
