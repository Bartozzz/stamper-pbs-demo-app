import i18n from "../translations";
import getEnvVariables from "../helpers/env";

const { apiUrl } = getEnvVariables();

const Server = {
  V1: apiUrl,
};

const V1 = {
  Account: {
    ApplicationToken() {
      return `${Server.V1}/Account/ApplicationToken`;
    },

    Login() {
      return `${Server.V1}/Account/Login`;
    },

    ExternalLogin() {
      return `${Server.V1}/Account/ExternalLogin`;
    },

    ForgotPassword() {
      return `${Server.V1}/Account/ForgotPassword`;
    },

    ChangePassword() {
      return `${Server.V1}/Account/ChangePassword`;
    },

    Register() {
      return `${Server.V1}/Account/Register`;
    },

    ExternalRegister() {
      return `${Server.V1}/Account/ExternalRegister`;
    },

    Logout() {
      return `${Server.V1}/Account/Logout`;
    },

    RefreshToken() {
      return `${Server.V1}/Account/RefreshToken`;
    },

    GetProfile() {
      return `${Server.V1}/Account/GetProfile`;
    },

    UpdateProfile() {
      return `${Server.V1}/Account/UpdateProfile`;
    },

    UpdatePhoto() {
      return `${Server.V1}/Account/UpdatePhoto`;
    },

    UpdateNewsletter() {
      return `${Server.V1}/Account/UpdateNewsletter`;
    },

    TermsAndConditions(language = i18n.appLocale) {
      return `${Server.V1}/Account/TermsAndConditions?language=${language}`;
    },

    Legal(language = i18n.appLocale) {
      return `${Server.V1}/Account/Legal?language=${language}`;
    },

    Newsletter(language = i18n.appLocale) {
      return `${Server.V1}/Account/Newsletter?language=${language}`;
    },
  },

  Wallet: {
    Get() {
      return `${Server.V1}/Wallet/Get`;
    },
  },

  Favorite: {
    Add() {
      return `${Server.V1}/Favorite/Add`;
    },

    Remove() {
      return `${Server.V1}/Favorite/Remove`;
    },
  },

  Region: {
    Get() {
      return `${Server.V1}/Region/Get`;
    },
  },

  Rewards: {
    Count() {
      return `${Server.V1}/Rewards/Count`;
    },

    Get() {
      return `${Server.V1}/Rewards/Get`;
    },

    GetDiscountCode() {
      return `${Server.V1}/Rewards/GetDiscountCode`;
    },
  },

  Card: {
    Remove() {
      return `${Server.V1}/Card/Remove`;
    },

    Add() {
      return `${Server.V1}/Card/Add`;
    },
  },

  Stamp: {
    Add() {
      return `${Server.V1}/Stamp/Add`;
    },
  },

  Info: {
    GetNotifications() {
      return `${Server.V1}/Info/GetNotifications`;
    },
  },
};

// Those endpoints doesn't require Authorization header:
const publicUrls = [
  V1.Account.ApplicationToken(),
  V1.Account.RefreshToken(),
  V1.Account.Register(),
  V1.Account.ExternalRegister(),
  V1.Account.Login(),
  V1.Account.ExternalLogin(),
  V1.Account.TermsAndConditions(),
];

export default V1;
export { Server, V1, publicUrls };
