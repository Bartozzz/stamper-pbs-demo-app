import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import colors from "../constants/Colors";
import layout from "../constants/Layout";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AuthLoginScreen from "../screens/AuthLoginScreen";
import AuthRegisterScreen from "../screens/AuthRegisterScreen";
import UrlScreen from "../screens/UrlScreen";
import ScannerScreen from "../screens/ScannerScreen";
import OutputScreen from "../screens/OutputScreen";

const AuthStack = createStackNavigator(
  {
    Login: AuthLoginScreen,
    Register: AuthRegisterScreen
  },

  {
    //…
  }
);

const AppStack = createStackNavigator(
  {
    // Screen 1:
    Url: UrlScreen,
    // Screen 2:
    Scanner: ScannerScreen,
    // Screen 3
    Output: OutputScreen
  },

  {
    initialRouteName: "Url",

    defaultNavigationOptions: {
      headerTintColor: colors.color,

      headerStyle: {
        backgroundColor: colors.primary
      },

      headerTitleStyle: {
        textTransform: "uppercase",
        fontFamily: layout.fontHead,
        fontSize: 20
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
