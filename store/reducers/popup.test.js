import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  POPUP_REQUEST,
  POPUP_SUCCESS,
  POPUP_FAIL,
  getPopUp,
} from "./popup";

describe("Popup Store", () => {
  const store = mockStore();

  const data = {
    title: "Title",
    message: "Message",
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("POPUP_REQUEST", () => {
      expect(reducer(initialState, { type: POPUP_REQUEST })).toEqual({
        ...initialState,
      });
    });

    it("POPUP_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: POPUP_SUCCESS,
          payload: {
            data: {
              ...data,
            },
          },
        })
      ).toEqual({
        ...data,
      });
    });

    it("POPUP_FAIL", () => {
      expect(reducer(initialState, { type: POPUP_FAIL })).toEqual({
        ...initialState,
      });
    });
  });

  describe("action", () => {
    describe("getPopUp", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Info.GetNotifications()).reply(200);

        try {
          await store.dispatch(getPopUp());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === POPUP_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === POPUP_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Info.GetNotifications()).networkError();

        try {
          await store.dispatch(getPopUp());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === POPUP_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === POPUP_FAIL)
          ).toBeDefined();
        }
      });
    });
  });
});
