import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import * as Route from "./index";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

import InfoErrorScreen from "../screens/info/ErrorScreen";
import InfoSuccessScreen from "../screens/info/SuccessScreen";
import PrizesListScreen from "../screens/prizes/ListScreen";
import MapScreen from "../screens/map/MapScreen";
import CardInfoScreen from "../screens/card/CardInfo";
import DashboardMainScreen from "../screens/dashboard/MainScreen";
import AuthLoadingScreen from "../screens/auth/LoadingScreen";
import AuthLoginScreen from "../screens/auth/LoginScreen";
import AuthRegisterScreen from "../screens/auth/RegisterScreen";
import AuthResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import ProfileMenuScreen from "../screens/profile/MenuScreen";
import ProfileEditScreen from "../screens/profile/EditScreen";
import ProfilePasswordScreen from "../screens/profile/PasswordScreen";
import ProfileLogoutScreen from "../screens/profile/LogoutScreen";
import ScannerScanScreen from "../screens/scanner/ScanScreen";
import WalletCardsScreen from "../screens/wallet/CardsScreen";
import WalletPlacesScreen from "../screens/wallet/PlacesScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";

const defaultNavigationOptions = {
  headerTintColor: colors.color,
  headerBackTitle: null,

  headerStyle: {
    marginTop: layout.headerTopSpacer,

    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: colors.primary
  },

  headerTitleStyle: {
    flex: 1,

    fontFamily: "poppins-semi-bold",
    fontSize: 17,

    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center"
  }
};

const disableNavigationAnimations = {
  transitionConfig: () => ({
    transitionSpec: {
      // Disable animations:
      duration: -1
    }
  })
};

const AuthStack = createStackNavigator(
  {
    [Route.AUTH_LOGIN]: AuthLoginScreen,
    [Route.AUTH_REGISTER]: AuthRegisterScreen,
    [Route.AUTH_RESET]: AuthResetPasswordScreen,
    [Route.AUTH_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.AUTH_LOGIN,
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const InfoStack = createStackNavigator(
  {
    [Route.INFO_ERROR]: InfoErrorScreen,
    [Route.INFO_SUCCESS]: InfoSuccessScreen
  },
  {
    initialRouteName: Route.INFO_SUCCESS,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const PrizesStack = createStackNavigator(
  {
    [Route.PRIZES_LIST]: PrizesListScreen
  },
  {
    initialRouteName: Route.PRIZES_LIST,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const MapStack = createStackNavigator(
  {
    [Route.MAP_ALL]: MapScreen
  },
  {
    initialRouteName: Route.MAP_ALL,
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const CardStack = createStackNavigator(
  {
    [Route.CARD_INFO]: CardInfoScreen
  },
  {
    initialRouteName: Route.CARD_INFO,
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const DashboardStack = createStackNavigator(
  {
    [Route.DASHBOARD_MAIN]: DashboardMainScreen,
    [Route.DASHBOARD_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.DASHBOARD_MAIN,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const ProfileStack = createStackNavigator(
  {
    [Route.PROFILE_MENU]: ProfileMenuScreen,
    [Route.PROFILE_EDIT]: ProfileEditScreen,
    [Route.PROFILE_PASSWORD]: ProfilePasswordScreen,
    [Route.PROFILE_LOGOUT]: ProfileLogoutScreen,
    [Route.PROFILE_TOS]: TermsOfServiceScreen
  },
  {
    initialRouteName: Route.PROFILE_MENU,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const WalletStack = createStackNavigator(
  {
    [Route.WALLET_CARDS]: WalletCardsScreen,
    [Route.WALLET_PLACES]: WalletPlacesScreen
  },
  {
    initialRouteName: Route.WALLET_CARDS,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

const ScannerStack = createStackNavigator(
  {
    [Route.SCANNER_SCAN]: ScannerScanScreen
  },
  {
    initialRouteName: Route.SCANNER_SCAN,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    ...disableNavigationAnimations
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      [Route.AUTH]: AuthStack,
      [Route.INFO]: InfoStack,
      [Route.PRIZES]: PrizesStack,
      [Route.MAP]: MapStack,
      [Route.CARD]: CardStack,
      [Route.AUTH_LOADING]: AuthLoadingScreen,
      [Route.DASHBOARD]: DashboardStack,
      [Route.SCANNER]: ScannerStack,
      [Route.PROFILE]: ProfileStack,
      [Route.WALLET]: WalletStack
    },
    {
      initialRouteName: Route.AUTH_LOADING
    }
  )
);
