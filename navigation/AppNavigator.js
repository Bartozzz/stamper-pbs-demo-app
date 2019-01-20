import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import colors from "../constants/Colors";
import layout from "../constants/Layout";
import MainScreen from "../screens/dashboard/MainScreen";
import AuthLoadingScreen from "../screens/auth/LoadingScreen";
import AuthLoginScreen from "../screens/auth/LoginScreen";
import AuthRegisterScreen from "../screens/auth/RegisterScreen";
import UrlScreen from "../screens/scanner/UrlScreen";
import ScanScreen from "../screens/scanner/ScanScreen";
import OutputScreen from "../screens/scanner/OutputScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import ProfileMenuScreen from "../screens/profile/ProfileMenuScreen";

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
    TermsOfService: TermsOfServiceScreen
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions
  }
);

const ProfileStack = createStackNavigator(
  {
    ProfileMenu: ProfileMenuScreen,
    TermsOfService: TermsOfServiceScreen
  },
  {
    initialRouteName: "ProfileMenu",
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
      Dashboard: DashboardStack,
      Profile: ProfileStack
    },
    {
      initialRouteName: "Profile"
    }
  )
);
