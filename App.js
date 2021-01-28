import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppLoading } from "expo";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as Notifications from "expo-notifications";
import { Platform, StatusBar } from "react-native";
import * as Analytics from "expo-firebase-analytics";
import ErrorBoundary from "./helpers/ErrorBoundary";
import AppContainer from "./navigation/AppNavigator";
import { store, persistor } from "./store";
import { addLaunch } from "./store/reducers/review";

import images from "./constants/images";
import fonts from "./constants/fonts";

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

export const App = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [, setNotification] = React.useState(false);

  const notificationListener = React.createRef();
  const responseListener = React.createRef();

  const loadResources = async () => {
    await Promise.all([
      Font.loadAsync(fonts),
      Asset.loadAsync(Object.values(images)),
      Icon.Ionicons.font,
    ]);
  };

  const handleLoadingFailure = (error) => {
    console.warn(error);
  };

  const handleLoadingSuccess = () => {
    setLoading(false);
    store.dispatch(addLaunch());
  };

  React.useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Maybe we'll want to add some actions when the notifications are being opened
        setNotification(notification);
      }
    );
    Analytics.setDebugModeEnabled(__DEV__);

    return function () {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  });

  if (isLoading) {
    return (
      <ErrorBoundary>
        <AppLoading
          startAsync={loadResources}
          onError={handleLoadingFailure}
          onFinish={handleLoadingSuccess}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
