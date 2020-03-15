import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Route from "./index";
import colors from "../constants/Colors";
import layout from "../constants/Layout";
import defaultStyles from "../constants/Styles";

import HeaderTitle from "../components/nav/HeaderTitle";
import HeaderEmpty from "../components/nav/HeaderEmpty";
import HeaderBackIcon from "../components/nav/HeaderBack";

import i18n from "../translations";

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


const Stack = createStackNavigator();
const defaultNavigationOptions = {
  animationEnabled: false,
  gestureEnabled: true,
  headerTitleAlign: "left",
  headerTintColor: "red",
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
    justifyContent: "center",
  }
 };

function AuthStack() {
  return(
    <Stack.Navigator 
    initialRouteName={Route.AUTH_LOGIN} 
    headerMode="screen"
  >
      <Stack.Screen
        options={{ 
          title: i18n.t("navigation.auth.login"),
          headerTitleAlign: "left",
          headerTitle: HeaderTitle,
          headerLeft: HeaderEmpty,
          headerStyle: defaultStyles.headerTwoLines,
        }}
        name={Route.AUTH_LOGIN}
        component={AuthLoginScreen}
      />
      <Stack.Screen
        options={{
          defaultNavigationOptions,
          title: i18n.t("navigation.auth.register"),
        }}
        name={Route.AUTH_REGISTER}
        component={AuthRegisterScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.AUTH_RESET}
        component={AuthResetPasswordScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.AUTH_TOS}
        component={TermsOfServiceScreen}
      /> 
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.AUTH_EXTERNAL_TOS}
        component={AuthTermsOfUseScreen}
      /> 
  </Stack.Navigator>
  )
};

function AppStack() {
  return(
    <Stack.Navigator 
      initialRouteName={Route.DASHBOARD_MAIN} 
      headerMode="screen"
    >
      <Stack.Screen
        options={{ 
          defaultNavigationOptions,     
          title: i18n.t("navigation.dashboard.main"),
          headerShown: false 
        }}
        name={Route.DASHBOARD}
        component={DashboardMainScreen}
      />
      <Stack.Screen
        options={{ 
          defaultNavigationOptions, 
          title: i18n.t("navigation.dashboard.main"),
          headerShown: false 
        }}
        name={Route.DASHBOARD_MAIN}
        component={DashboardMainScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.DASHBOARD_TOS}
        component={TermsOfServiceScreen}
      />

      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE}
        component={ProfileMenuScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_MENU}
        component={ProfileMenuScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_EDIT}
        component={ProfileEditScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_PASSWORD}
        component={ProfilePasswordScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_LOGOUT}
        component={ProfileLogoutScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_TOS}
        component={TermsOfServiceScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_LEGAL}
        component={ProfileLegalScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_NEWSLETTER_TOS}
        component={ProfileNewsletterTermsScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PROFILE_NEWSLETTER_UPDATE}
        component={ProfileNewsletterUpdateScreen}
      />
      
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.MAP}
        component={MapScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.MAP_ALL}
        component={MapScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.MAP_ACCEPT_CARD_TERMS}
        component={MapAcceptCardTermsScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.MAP_CONFIRM_REFUSED_TERMS}
        component={MapConfirmRefusedTermsScreen}
      />

      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PRIZES}
        component={PrizesAvailableScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PRIZES_LIST}
        component={PrizesAvailableScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PRIZES_RECEIVED}
        component={PrizesReceivedScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.PRIZES_SELECTED}
        component={PrizesRewardCodeScreen}
      />
      
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.WALLET}
        component={WalletCardsScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.WALLET_CARDS}
        component={WalletCardsScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.WALLET_PLACES}
        component={WalletPlacesScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.WALLET_CARD_REMOVAL_CONFIRMATION}
        component={WalletCardRemovalConfirmationScreen}
      />

      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.CARD}
        component={CardInfoScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.CARD_INFO}
        component={CardInfoScreen}
      />

      {/* The initial route is always mounted. If we set it to INFO_ERROR, it will
      trigger INFO_ERROR's setTimeout even if we navigte to INFO_SUCCESS: */}
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.INFO}
        component={() => null}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.INFO_INIT}
        component={() => null}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.INFO_ERROR}
        component={InfoErrorScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.INFO_SUCCESS}
        component={InfoSuccessScreen}
      />
      
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.SCANNER}
        component={ScannerScanScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.SCANNER_SCAN}
        component={ScannerScanScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.SCANNER_ACCEPT_STAMP_TERMS}
        component={ScannerAcceptStampTermsScreen}
      />
      <Stack.Screen
        options={ defaultNavigationOptions }
        name={Route.SCANNER_CONFIRM_REFUSED_TERMS}
        component={ScannerConfirmRefusedTermsScreen}
      />
  </Stack.Navigator>
  )
};

export default function AppContainer() {
 return (
  <NavigationContainer initialRouteName={Route.AUTH_CONNECTIVITY_CHECK}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          options={ defaultNavigationOptions }
          name={Route.AUTH_CONNECTIVITY_CHECK}
          component={AuthConnectivityCheckScreen}
        />
        <Stack.Screen
          options={ defaultNavigationOptions }
          name={Route.AUTH_LOADING}
          component={AuthLoadingScreen}
        />
        <Stack.Screen
          options={ defaultNavigationOptions }
          name={Route.AUTH}
          component={AuthStack}
        />
        <Stack.Screen
          options={ defaultNavigationOptions }
          name={Route.APP}
          component={AppStack}
        />
      </Stack.Navigator>
  </NavigationContainer>
 )
}
