import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppLoading } from "expo";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as Notifications from "expo-notifications";
import { AsyncStorage, Platform, StatusBar } from "react-native";
import * as Analytics from "expo-firebase-analytics";
import useRollbar from "./helpers/hooks/useRollbar";
import AppContainer from "./navigation/AppNavigator";
import { store, persistor } from "./store";
import { APP_LAUNCHES, addLaunch } from "./store/reducers/review";

const prefix = "https://getstamper.com/";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default class App extends React.Component {
  state = {
    rollbar: useRollbar(),
    isLoadingComplete: false,
    notification: false,
  };

  constructor(props) {
    super(props);
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }

  componentDidMount() {
    // This listener is fired whenever a notification is received while the app is foregrounded
    this.notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Maybe we'll want to add some actions when the notifications are being opened
        this.setState({ notification: notification });
      }
    );
    Analytics.setDebugModeEnabled(__DEV__);
  }

  componentWillUnmount() {
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  componentDidCatch(error) {
    this.state.rollbar.critical(error);
  }

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
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
            <AppContainer
              uriPrefix={prefix}
              onNavigationStateChange={(prevState, currentState, action) => {
                const currentRouteName = getActiveRouteName(currentState);
                const previousRouteName = getActiveRouteName(prevState);

                if (previousRouteName !== currentRouteName) {
                  Analytics.logEvent("screen_view", {
                    screen_name: currentRouteName,
                    page_title: currentRouteName,
                  });
                }
              }}
            />
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Local storage (redux):

      // Preload assets:
      Asset.loadAsync([
        require("./assets/images/welcome/1.png"),
        require("./assets/images/welcome/2.png"),
        require("./assets/images/welcome/3.png"),
        require("./assets/images/welcome/4.png"),
        require("./assets/backgrounds/card.png"),
        // require("./assets/backgrounds/cards_wn.png"),
        require("./assets/backgrounds/cards.png"),
        // require("./assets/backgrounds/details_wn.png"),
        require("./assets/backgrounds/details.png"),
        // require("./assets/backgrounds/home_wn.png"),
        require("./assets/backgrounds/home.png"),
        // require("./assets/backgrounds/logout_wn.png"),
        require("./assets/backgrounds/logout.png"),
        // require("./assets/backgrounds/nearby_wn.png"),
        require("./assets/backgrounds/nearby.png"),
        // require("./assets/backgrounds/password_wn.png"),
        require("./assets/backgrounds/password.png"),
        // require("./assets/backgrounds/plain_wn.png"),
        require("./assets/backgrounds/plain.png"),
        // require("./assets/backgrounds/prizes_wn.png"),
        require("./assets/backgrounds/prizes.png"),
        // require("./assets/backgrounds/profile_wn.png"),
        require("./assets/backgrounds/profile.png"),
        // require("./assets/backgrounds/tos_wn.png"),
        require("./assets/backgrounds/tos.png"),
        // require("./assets/backgrounds/wallet_wn.png"),
        require("./assets/backgrounds/wallet.png"),
        require("./assets/logos/stamper_logo_300px.png"),
        require("./assets/logos/stamper_logo_300px_en.png"),
        require("./assets/logos/stamper_logo_2x.png"),
        // require("./assets/logos/stamper_logo_3x.png"),
        // require("./assets/logos/stamper_logo_4x.png"),
        require("./assets/logos/stamper_sygnet_300px.png"),
        require("./assets/logos/stamper_sygnet_2x.png"),
        // require("./assets/logos/stamper_sygnet_3x.png"),
        // require("./assets/logos/stamper_sygnet_4x.png"),
        require("./assets/loaders/map.gif"),
        require("./assets/loaders/rewards.gif"),
        require("./assets/loaders/wallet.gif"),
        require("./assets/images/delete.png"),
        require("./assets/images/error.png"),
        require("./assets/images/icon.png"),
        require("./assets/images/plus.png"),
        require("./assets/images/qr.png"),
        require("./assets/images/splash.png"),
        require("./assets/images/success.png"),
        require("./assets/images/icons/already-in-wallet.png"),
        require("./assets/images/icons/balance.png"),
        require("./assets/images/icons/email.png"),
        require("./assets/images/icons/location_indicator.png"),
        require("./assets/images/icons/newsletter.png"),
        require("./assets/images/icons/next_icon.png"),
        require("./assets/images/icons/wallet.png"),
        require("./assets/images/menu/map.png"),
        require("./assets/images/menu/market.png"),
        require("./assets/images/menu/market-inactive.png"),
        require("./assets/images/menu/mode_cards.png"),
        require("./assets/images/menu/mode_map.png"),
        require("./assets/images/menu/prize.png"),
        require("./assets/images/menu/profile.png"),
        require("./assets/images/menu/scanner.png"),
        require("./assets/images/menu/wallet.png"),
        require("./assets/success/earned_reward.gif"),
        require("./assets/success/received_reward.gif"),
        require("./assets/success/card_add.gif"),
        require("./assets/success/stamp_add.gif"),
        require("./assets/success/stamp_subtract.gif"),
      ]),

      // Load fonts:
      Font.loadAsync({
        ...Icon.Ionicons.font,
        // Space Mono:
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        // Poppins:,
        "poppins-thin": require("./assets/fonts/Poppins-Thin.ttf"),
        "poppins-thin-italic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
        "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
        "poppins-light-italic": require("./assets/fonts/Poppins-LightItalic.ttf"),
        "poppins-extra-light": require("./assets/fonts/Poppins-ExtraLight.ttf"),
        "poppins-extra-light-italic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
        "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
        "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "poppins-medium-italic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
        "poppins-black": require("./assets/fonts/Poppins-Black.ttf"),
        "poppins-black-italic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
        "poppins-semi-bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "poppins-semi-bold-italic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "poppins-bold-italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
        "poppins-extra-bold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
        "poppins-extra-bold-italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
        // Nunito:
        "nunito-light": require("./assets/fonts/Nunito-Light.ttf"),
        "nunito-light-italic": require("./assets/fonts/Nunito-LightItalic.ttf"),
        "nunito-extra-light": require("./assets/fonts/Nunito-ExtraLight.ttf"),
        "nunito-extra-light-italic": require("./assets/fonts/Nunito-ExtraLightItalic.ttf"),
        "nunito-italic": require("./assets/fonts/Nunito-Italic.ttf"),
        "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
        "nunito-black": require("./assets/fonts/Nunito-Black.ttf"),
        "nunito-black-italic": require("./assets/fonts/Nunito-BlackItalic.ttf"),
        "nunito-semi-bold": require("./assets/fonts/Nunito-SemiBold.ttf"),
        "nunito-semi-bold-italic": require("./assets/fonts/Nunito-SemiBoldItalic.ttf"),
        "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
        "nunito-bold-italic": require("./assets/fonts/Nunito-BoldItalic.ttf"),
        "nunito-extra-bold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
        "nunito-extra-bold-italic": require("./assets/fonts/Nunito-ExtraBoldItalic.ttf"),
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });

    store.dispatch(addLaunch());

    AsyncStorage.setItem(
      APP_LAUNCHES,
      String(store.getState().review.appLaunches)
    );
  };
}
