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
import PrizesAvailableScreen from "../screens/prizes/AvailableListScreen";
import PrizesReceivedScreen from "../screens/prizes/ReceivedListScreen";
import PrizesRewardCodeScreen from "../screens/prizes/RewardCodeScreen";
import MapScreen from "../screens/map/MapScreen";
import MapAcceptCardTermsScreen from "../screens/map/AcceptCardTermsScreen";
import MapConfirmRefusedTermsScreen from "../screens/map/ConfirmRefusedTermsScreen";
import CardInfoScreen from "../screens/card/CardInfo";
import DashboardMainScreen from "../screens/dashboard/MainScreen";
import AuthConnectivityCheckScreen from "../screens/auth/ConnectivityCheckScreen";
import AuthLoadingScreen from "../screens/auth/LoadingScreen";
import AuthWelcomeScreen from "../screens/auth/WelcomeScreen";
import AuthLoginScreen from "../screens/auth/LoginScreen";
import AuthRegisterScreen from "../screens/auth/RegisterScreen";
import AuthResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import AuthTermsOfUseScreen from "../screens/auth/TermsOfUseScreen";
import ProfileMenuScreen from "../screens/profile/MenuScreen";
import ProfileEditScreen from "../screens/profile/EditScreen";
import ProfilePasswordScreen from "../screens/profile/PasswordScreen";
import ProfileLogoutScreen from "../screens/profile/LogoutScreen";
import ProfileLegalScreen from "../screens/profile/LegalScreen";
import ProfileNewsletterTermsScreen from "../screens/profile/NewsletterTermsScreen";
import ProfileNewsletterUpdateScreen from "../screens/profile/NewsletterUpdateScreen";
import ScannerScanScreen from "../screens/scanner/ScanScreen";
import ScannerAcceptStampTermsScreen from "../screens/scanner/AcceptStampTermsScreen";
import ScannerConfirmRefusedTermsScreen from "../screens/scanner/ConfirmRefusedTermsScreen";
import WalletCardsScreen from "../screens/wallet/CardsScreen";
import WalletPlacesScreen from "../screens/wallet/PlacesScreen";
import WalletCardRemovalConfirmationScreen from "../screens/wallet/CardRemovalConfirmationScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";

const defaultNavigationOptions = {
  headerTintColor: colors.color,
  // headerBackTitle: null,

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
    [Route.AUTH_WELCOME]: AuthWelcomeScreen,
    [Route.AUTH_LOGIN]: AuthLoginScreen,
    [Route.AUTH_REGISTER]: AuthRegisterScreen,
    [Route.AUTH_RESET]: AuthResetPasswordScreen,
    [Route.AUTH_TOS]: TermsOfServiceScreen,
    [Route.AUTH_EXTERNAL_TOS]: AuthTermsOfUseScreen
  },
  {
    initialRouteName: Route.AUTH_WELCOME,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    headerMode: "screen",
    ...disableNavigationAnimations
  }
);

const AppStack = createStackNavigator(
  {
    [Route.DASHBOARD]: DashboardMainScreen,
    [Route.DASHBOARD_MAIN]: DashboardMainScreen,
    [Route.DASHBOARD_TOS]: TermsOfServiceScreen,

    [Route.PROFILE]: ProfileMenuScreen,
    [Route.PROFILE_MENU]: ProfileMenuScreen,
    [Route.PROFILE_EDIT]: ProfileEditScreen,
    [Route.PROFILE_PASSWORD]: ProfilePasswordScreen,
    [Route.PROFILE_LOGOUT]: ProfileLogoutScreen,
    [Route.PROFILE_TOS]: TermsOfServiceScreen,
    [Route.PROFILE_LEGAL]: ProfileLegalScreen,
    [Route.PROFILE_NEWSLETTER_TOS]: ProfileNewsletterTermsScreen,
    [Route.PROFILE_NEWSLETTER_UPDATE]: ProfileNewsletterUpdateScreen,

    [Route.MAP]: MapScreen,
    [Route.MAP_ALL]: MapScreen,
    [Route.MAP_ACCEPT_CARD_TERMS]: MapAcceptCardTermsScreen,
    [Route.MAP_CONFIRM_REFUSED_TERMS]: MapConfirmRefusedTermsScreen,

    [Route.PRIZES]: PrizesAvailableScreen,
    [Route.PRIZES_LIST]: PrizesAvailableScreen,
    [Route.PRIZES_RECEIVED]: PrizesReceivedScreen,
    [Route.PRIZES_SELECTED]: PrizesRewardCodeScreen,

    [Route.WALLET]: WalletCardsScreen,
    [Route.WALLET_CARDS]: WalletCardsScreen,
    [Route.WALLET_PLACES]: WalletPlacesScreen,
    [Route.WALLET_CARD_REMOVAL_CONFIRMATION]: WalletCardRemovalConfirmationScreen,

    [Route.CARD]: CardInfoScreen,
    [Route.CARD_INFO]: CardInfoScreen,

    // The initial route is always mounted. If we set it to INFO_ERROR, it will
    // trigger INFO_ERROR's setTimeout even if we navigte to INFO_SUCCESS:
    [Route.INFO]: () => null,
    [Route.INFO_INIT]: () => null,
    [Route.INFO_ERROR]: InfoErrorScreen,
    [Route.INFO_SUCCESS]: InfoSuccessScreen,

    [Route.SCANNER]: ScannerScanScreen,
    [Route.SCANNER_SCAN]: ScannerScanScreen,
    [Route.SCANNER_ACCEPT_STAMP_TERMS]: ScannerAcceptStampTermsScreen,
    [Route.SCANNER_CONFIRM_REFUSED_TERMS]: ScannerConfirmRefusedTermsScreen
  },
  {
    initialRouteName: Route.DASHBOARD_MAIN,
    headerLayoutPreset: "left",
    defaultNavigationOptions,
    headerMode: "screen",
    ...disableNavigationAnimations
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      [Route.AUTH_CONNECTIVITY_CHECK]: AuthConnectivityCheckScreen,
      [Route.AUTH_LOADING]: AuthLoadingScreen,
      [Route.AUTH]: AuthStack,
      [Route.APP]: AppStack
    },
    {
      initialRouteName: Route.AUTH_CONNECTIVITY_CHECK,
      headerMode: "screen"
    }
  )
);
