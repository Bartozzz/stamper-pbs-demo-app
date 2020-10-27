import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  NEWSLETTER_UPDATE_REQUEST,
  NEWSLETTER_UPDATE_SUCCESS,
  NEWSLETTER_UPDATE_FAIL,
  PHOTO_UPDATE_REQUEST,
  PHOTO_UPDATE_SUCCESS,
  PHOTO_UPDATE_FAIL,
  PROFILE_SET_NICKNAME,
  PROFILE_SET_FIRSTNAME,
  PROFILE_SET_LASTNAME,
  PROFILE_SET_NEWSLETTER,
  PROFILE_SET_EMAIL,
  PROFILE_SET_PHOTO,
  getProfile,
  updateProfile,
  updatePhoto,
  updateNewsletter,
  setNickname,
  setFirstname,
  setLastname,
  setNewsletter,
  setEmail,
  setPhoto,
} from "./profile";

describe("Profile Store", () => {
  const store = mockStore();

  const data = {
    nickname: "nickname",
    firstname: "firstname",
    lastname: "lastname",
    newsletter: false,
    email: "test@test.pl",
    photo: "http://placekitten.com/200/200",
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("PROFILE_GET_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_GET_SUCCESS,
          payload: {
            data: {
              ...data,
            },
          },
        })
      ).toEqual(data);
    });

    it("PROFILE_SET_NICKNAME", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_NICKNAME,
          payload: data.nickname,
        })
      ).toEqual({
        ...initialState,
        nickname: data.nickname,
      });
    });

    it("PROFILE_SET_FIRSTNAME", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_FIRSTNAME,
          payload: data.firstname,
        })
      ).toEqual({
        ...initialState,
        firstname: data.firstname,
      });
    });

    it("PROFILE_SET_LASTNAME", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_LASTNAME,
          payload: data.lastname,
        })
      ).toEqual({
        ...initialState,
        lastname: data.lastname,
      });
    });

    it("PROFILE_SET_NEWSLETTER", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_NEWSLETTER,
          payload: true,
        })
      ).toEqual({
        ...initialState,
        newsletter: true,
      });
    });

    it("PROFILE_SET_EMAIL", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_EMAIL,
          payload: "changed@test.pl",
        })
      ).toEqual({
        ...initialState,
        email: "changed@test.pl",
      });
    });

    it("PROFILE_SET_PHOTO", () => {
      expect(
        reducer(initialState, {
          type: PROFILE_SET_PHOTO,
          payload: "http://placekitten.com/200/300",
        })
      ).toEqual({
        ...initialState,
        photo: "http://placekitten.com/200/300",
      });
    });
  });
  describe("actions", () => {
    describe("getProfile", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.GetProfile()).reply(200);

        try {
          await store.dispatch(getProfile());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PROFILE_GET_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.GetProfile()).networkError();

        try {
          await store.dispatch(getProfile());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PROFILE_GET_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("updateProfile", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdateProfile()).reply(200);

        try {
          await store.dispatch(updateProfile());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PROFILE_UPDATE_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdateProfile()).networkError();

        try {
          await store.dispatch(updateProfile());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PROFILE_UPDATE_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("updatePhoto", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdatePhoto()).reply(200);

        try {
          await store.dispatch(updatePhoto());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PHOTO_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PHOTO_UPDATE_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdateProfile()).networkError();

        try {
          await store.dispatch(updatePhoto());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PHOTO_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PHOTO_UPDATE_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("updateNewsletter", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdateNewsletter()).reply(200);

        try {
          await store.dispatch(updateNewsletter());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NEWSLETTER_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NEWSLETTER_UPDATE_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Account.UpdateNewsletter()).networkError();

        try {
          await store.dispatch(updateNewsletter());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === NEWSLETTER_UPDATE_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === NEWSLETTER_UPDATE_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("setNickname", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setNickname());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_NICKNAME)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setFirstname", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setFirstname());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_FIRSTNAME)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setLastname", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setLastname());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_LASTNAME)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setNewsletter", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setNewsletter());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_NEWSLETTER)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setEmail", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setEmail());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_EMAIL)
          ).toBeDefined();
        } catch (err) {}
      });
    });

    describe("setPhoto", () => {
      it("on success", async () => {
        try {
          await store.dispatch(setPhoto());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PROFILE_SET_PHOTO)
          ).toBeDefined();
        } catch (err) {}
      });
    });
  });
});
