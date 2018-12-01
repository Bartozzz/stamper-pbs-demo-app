import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import colors from "../constants/Colors";
import layout from "../constants/Layout";
import UrlScreen from "../screens/UrlScreen";
import ScannerScreen from "../screens/ScannerScreen";
import OutputScreen from "../screens/OutputScreen";

const AppNavigator = createStackNavigator(
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

export default createAppContainer(AppNavigator);
