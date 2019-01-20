import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import * as Route from "./index";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

import DashboardMainScreen from "../screens/dashboard/MainScreen";
import AuthLoadingScreen from "../screens/auth/LoadingScreen";
import AuthLoginScreen from "../screens/auth/LoginScreen";
import AuthRegisterScreen from "../screens/auth/RegisterScreen";
import ProfileMenuScreen from "../screens/profile/MenuScreen";
import ProfileEditScreen from "../screens/profile/EditScreen";
import ProfilePasswordScreen from "../screens/profile/PasswordScreen";
import ScannerUrlScreen from "../screens/scanner/UrlScreen";
import ScannerScanScreen from "../screens/scanner/ScanScreen";
import ScannerOutputScreen from "../screens/scanner/OutputScreen";
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
    [Route.AUTH_LOGIN]: AuthLoginScreen,
    [Route.AUTH_REGISTER]: AuthRegisterScreen,
    [Route.AUTH_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.AUTH_LOGIN,
    defaultNavigationOptions
  }
);

const DashboardStack = createStackNavigator(
  {
    [Route.DASHBOARD_MAIN]: DashboardMainScreen,
    [Route.DASHBOARD_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.DASHBOARD_MAIN,
    defaultNavigationOptions
  }
);

const ProfileStack = createStackNavigator(
  {
    [Route.PROFILE_MENU]: ProfileMenuScreen,
    [Route.PROFILE_EDIT]: ProfileEditScreen,
    [Route.PROFILE_PASSWORD]: ProfilePasswordScreen,
    [Route.PROFILE_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.PROFILE_MENU,
    defaultNavigationOptions
  }
);

const ScannerStack = createStackNavigator(
  {
    [Route.SCANNER_URL]: ScannerUrlScreen,
    [Route.SCANNER_SCAN]: ScannerScanScreen,
    [Route.SCANNER_DATA]: ScannerOutputScreen
  },
  {
    initialRouteName: Route.SCANNER_URL,
    defaultNavigationOptions
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      [Route.AUTH]: AuthStack,
      [Route.AUTH_LOADING]: AuthLoadingScreen,
      [Route.DASHBOARD]: DashboardStack,
      [Route.SCANNER]: ScannerStack,
      [Route.PROFILE]: ProfileStack
    },
    {
      initialRouteName: Route.PROFILE
    }
  )
);
