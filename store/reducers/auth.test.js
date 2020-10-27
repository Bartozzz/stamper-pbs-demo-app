import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  SET_EXPIRY_DATE,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  ACCESS_REQUEST,
  ACCESS_SUCCESS,
  ACCESS_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  NOTIFICATIONSTOKEN_REQUEST,
  NOTIFICATIONSTOKEN_SUCCESS,
  NOTIFICATIONSTOKEN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  authorize,
  login,
  loginExternal,
  loginApple,
  getNotificationsToken,
  register,
  registerExternal,
  registerApple,
  logout,
  changePassword,
  resetPassword,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
  setNotificationsToken,
} from "./auth";

describe("Auth reducer", () => {
  const store = mockStore();

  const data = {
    fetchingData: false,
    appToken: "appToken",
    appTokenExpiryDate: "2020-10-20T21:57:06+00:00",
    expiryDate: "2020-10-20T21:57:06+00:00",
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("SET_EXPIRY_DATE", () => {
      expect(
        reducer(initialState, {
          type: SET_EXPIRY_DATE,
          payload: data.expiryDate,
        })
      ).toEqual({
        ...initialState,
        expiryDate: data.expiryDate,
      });
    });

    it("SET_ACCESS_TOKEN", () => {
      expect(
        reducer(initialState, {
          type: SET_ACCESS_TOKEN,
          payload: data.accessToken,
        })
      ).toEqual({
        ...initialState,
        accessToken: data.accessToken,
      });
    });

    it("SET_REFRESH_TOKEN", () => {
      expect(
        reducer(initialState, {
          type: SET_REFRESH_TOKEN,
          payload: data.refreshToken,
        })
      ).toEqual({
        ...initialState,
        refreshToken: data.refreshToken,
      });
    });

    it("LOGIN_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: LOGIN_REQUEST,
        })
      ).toEqual({
        ...initialState,
        fetchingData: true,
      });
    });

    it("REGISTER_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: REGISTER_REQUEST,
        })
      ).toEqual({
        ...initialState,
        fetchingData: true,
      });
    });

    it("ACCESS_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: ACCESS_REQUEST,
        })
      ).toEqual({
        ...initialState,
        appToken: null,
      });
    });

    it("ACCESS_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: ACCESS_REQUEST,
        })
      ).toEqual({
        ...initialState,
        appToken: null,
      });
    });

    it("ACCESS_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: ACCESS_SUCCESS,
          payload: { data: { ...data } },
        })
      ).toEqual({
        ...initialState,
        appToken: data.accessToken,
        appTokenExpiryDate: data.expiryDate,
      });
    });

    it("LOGOUT_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: LOGOUT_REQUEST,
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      });
    });

    it("LOGOUT_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: LOGOUT_SUCCESS,
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      });
    });

    it("LOGOUT_FAIL", () => {
      expect(
        reducer(initialState, {
          type: LOGOUT_FAIL,
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      });
    });

    it("LOGIN_FAIL", () => {
      expect(
        reducer(initialState, {
          type: LOGIN_FAIL,
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      });
    });

    it("REGISTER_FAIL", () => {
      expect(
        reducer(initialState, {
          type: REGISTER_FAIL,
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      });
    });

    it("LOGIN_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: LOGIN_SUCCESS,
          payload: { data: { ...data } },
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: data.expiryDate,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    });

    it("REGISTER_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: REGISTER_SUCCESS,
          payload: { data: { ...data } },
        })
      ).toEqual({
        ...initialState,
        fetchingData: false,
        expiryDate: data.expiryDate,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    });
  });

  describe("action", () => {
    describe("authorize", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ApplicationToken()).reply(200);

        try {
          await store.dispatch(authorize());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === ACCESS_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === ACCESS_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ApplicationToken()).networkError();

        try {
          await store.dispatch(authorize());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === ACCESS_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === ACCESS_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("login", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.Login()).reply(200);

        try {
          await store.dispatch(login("email", "password"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.Login()).networkError();

        try {
          await store.dispatch(login());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("loginExternal", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ExternalLogin()).reply(200);

        try {
          await store.dispatch(loginExternal("email"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ExternalLogin()).networkError();

        try {
          await store.dispatch(loginExternal());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("loginApple", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.AppleLogin()).reply(200);

        try {
          await store.dispatch(loginApple("email"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ExternalLogin()).networkError();

        try {
          await store.dispatch(loginExternal());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGIN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === LOGIN_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("setNotificationsToken", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.SetNotificationsToken()).reply(200);

        try {
          await store.dispatch(setNotificationsToken("token"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.SetNotificationsToken()).networkError();

        try {
          await store.dispatch(setNotificationsToken("token"));
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("getNotificationsToken", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.GetNotificationsToken()).reply(200);

        try {
          await store.dispatch(getNotificationsToken());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.GetNotificationsToken()).networkError();

        try {
          await store.dispatch(getNotificationsToken());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NOTIFICATIONSTOKEN_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("register", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.Register()).reply(200);

        try {
          await store.dispatch(register("email", "password", "nickname"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.Register()).networkError();

        try {
          await store.dispatch(register("email", "password", "nickname"));
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("registerExternal", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ExternalRegister()).reply(200);

        try {
          await store.dispatch(
            registerExternal("email", "provider", "nickname")
          );
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ExternalRegister()).networkError();

        try {
          await store.dispatch(
            registerExternal("email", "provider", "nickname")
          );
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("registerApple", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.AppleRegister()).reply(200);

        try {
          await store.dispatch(
            registerApple("email", "identityToken", "nickname")
          );
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.AppleRegister()).networkError();

        try {
          await store.dispatch(
            registerApple("email", "identityToken", "nickname")
          );
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === REGISTER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === REGISTER_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("logout", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.Logout()).reply(200);

        try {
          await store.dispatch(logout());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === LOGOUT_REQUEST)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("changePassword", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ChangePassword()).reply(200);

        try {
          await store.dispatch(
            changePassword("Current", "NewPassword", "ConfirmNewPassword")
          );
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === CHANGE_PASSWORD_REQUEST)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("resetPassword", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ForgotPassword()).reply(200);

        try {
          await store.dispatch(resetPassword("email"));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === "noop")
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("changePassword", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.ChangePassword()).reply(200);

        try {
          await store.dispatch(
            changePassword("Current", "NewPassword", "ConfirmNewPassword")
          );
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === CHANGE_PASSWORD_REQUEST)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setExpiryDate", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setExpiryDate());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === SET_EXPIRY_DATE)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setAccessToken", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setAccessToken());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === SET_ACCESS_TOKEN)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setRefreshToken", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setRefreshToken());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === SET_REFRESH_TOKEN)
          ).toBeDefined();
        } catch (err) {}
      });
    });
  });
});
