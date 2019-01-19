import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import colors from "../constants/Colors";
import layout from "../constants/Layout";
import MainScreen from "../screens/dashboard/MainScreen";
import MenuScreen from "../screens/dashboard/MenuScreen";
import AuthLoadingScreen from "../screens/auth/LoadingScreen";
import AuthLoginScreen from "../screens/auth/LoginScreen";
import AuthRegisterScreen from "../screens/auth/RegisterScreen";
import UrlScreen from "../screens/scanner/UrlScreen";
import ScanScreen from "../screens/scanner/ScanScreen";
import OutputScreen from "../screens/scanner/OutputScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";

const defaultNavigationOptions = {
  headerTintColor: colors.color,

  headerStyle: {
    backgroundColor: colors.primary
  },

  headerTitleStyle: {
    textTransform: "uppercase",
    fontFamily: layout.fontHead,
    fontSize: 20
  }
};

const AuthStack = createStackNavigator(
  {
    Login: AuthLoginScreen,
    Register: AuthRegisterScreen,
    TermsOfService: TermsOfServiceScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions
  }
);

const DashboardStack = createStackNavigator(
  {
    Main: MainScreen,
    Menu: MenuScreen,
    TermsOfService: TermsOfServiceScreen
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions
  }
);

const AppStack = createStackNavigator(
  {
    Url: UrlScreen,
    Scanner: ScanScreen,
    Output: OutputScreen
  },
  {
    initialRouteName: "Url",
    defaultNavigationOptions
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      Dashboard: DashboardStack
    },
    {
      initialRouteName: "Dashboard"
    }
  )
);
