const Server = {
  V1: `http://stamper-mobile-api-users.azurewebsites.net`
};

const V1 = {
  Init: {
    Run() {
      return `${Server.V1}/Init/Run`;
    }
  },

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

    Register() {
      return `${Server.V1}/Account/Register`;
    },

    ExternalRegister() {
      return `${Server.V1}/Account/ExternalRegister`;
    },

    Logout() {
      return `${Server.V1}/Account/Logout`;
    },

    GetProfile() {
      return `${Server.V1}/Account/GetProfile`;
    },

    UpdatePhoto() {
      return `${Server.V1}/Account/UpdatePhoto`;
    },

    UpdateProfile() {
      return `${Server.V1}/Account/UpdateProfile`;
    },

    ChangePassword() {
      return `${Server.V1}/Account/ChangePassword`;
    },

    GetTermsAndConditions() {
      return `${Server.V1}/Account/GetTermsAndConditions`;
    }
  },

  Wallet: {
    Get() {
      return `${Server.V1}/Wallet/Get`;
    }
  },

  Favorite: {
    Remove() {
      return `${Server.V1}/Favorite/Remove`;
    }
  },

  Region: {
    Get() {
      return `${Server.V1}/Region/Get`;
    }
  },

  Rewards: {
    Count() {
      return `${Server.V1}/Rewards/Count`;
    },

    Get() {
      return `${Server.V1}/Rewards/Get`;
    }
  },

  Card: {
    Remove() {
      return `${Server.V1}/Card/Remove`;
    },

    Add() {
      return `${Server.V1}/Card/Add`;
    }
  },

  Stamp: {
    Add() {
      return `${Server.V1}/Stamp/Add`;
    }
  }
};

export default V1;
export { Server, V1 };
