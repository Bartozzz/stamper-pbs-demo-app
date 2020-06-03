import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  PRIZES_RESTORE,
  PRIZES_GET_REQUEST,
  PRIZES_GET_SUCCESS,
  PRIZES_GET_FAIL,
  PRIZES_GET_COUNT_REQUEST,
  PRIZES_GET_COUNT_SUCCESS,
  PRIZES_GET_COUNT_FAIL,
  PRIZES_GET_DISCOUNT_REQUEST,
  PRIZES_GET_DISCOUNT_SUCCESS,
  PRIZES_GET_DISCOUNT_FAIL,
  getPrizes,
  getPrizesCount,
  getDiscountCode,
} from "./prizes";

describe("Prizes store", () => {
  const store = mockStore();

  const prize = {
    cardNumber: "100000309",
    collectOffline: true,
    collectOnline: false,
    collectOnlineCode: "1234567890",
    collectOnlineLogoUrl: null,
    collectOnlineUrl: "http://google.com",
    collected: true,
    collectedDate: "0001-01-01T00:00:00",
    iconUrl: "https://semble8cards.blob.core.windows.net/datafiles/kawa.png",
    id: "61621859-5159-41bf-9a59-00fe0b756e4b",
    logoUrl: "https://semble8cards.blob.core.windows.net/datafiles/logo1.png",
    merchantName: "Merchant Name 2",
    position: 0,
    title: "Title Card 1_1",
    validTo: false,
    validToDate: "2019-06-02T22:27:40.9795804+00:00",
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("PRIZES_GET_REQUEST", () => {
      expect(reducer(initialState, { type: PRIZES_GET_REQUEST })).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it("PRIZES_GET_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: PRIZES_GET_SUCCESS,
          payload: {
            data: {
              cards: [prize],
            },
          },
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        prizes: [prize],
      });
    });

    it("PRIZES_GET_COUNT_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: PRIZES_GET_COUNT_SUCCESS,
          payload: { data: 1 },
        })
      ).toEqual({
        ...initialState,
        count: 1,
      });
    });

    it("PRIZES_GET_FAIL", () => {
      expect(reducer(initialState, { type: PRIZES_GET_FAIL })).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    it("PRIZES_RESTORE", () => {
      expect(
        reducer(initialState, {
          type: PRIZES_RESTORE,
          payload: {
            cards: [prize],
          },
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        prizes: [prize],
      });
    });
  });

  describe("action", () => {
    describe("getPrizes", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.Get()).reply(200);

        try {
          await store.dispatch(getPrizes());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PRIZES_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PRIZES_GET_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.Get()).networkError();

        try {
          await store.dispatch(getPrizes());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PRIZES_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PRIZES_GET_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("getPrizesCount", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.Count()).reply(200);

        try {
          await store.dispatch(getPrizesCount());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PRIZES_GET_COUNT_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PRIZES_GET_COUNT_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.Count()).networkError();

        try {
          await store.dispatch(getPrizes());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === PRIZES_GET_COUNT_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PRIZES_GET_COUNT_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("getDiscountCode", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.GetDiscountCode()).reply(200);

        try {
          await store.dispatch(getDiscountCode("cardID", "providerID"));
          const actions = store.getActions();

          expect(
            actions.find(
              (action) => action.type === PRIZES_GET_DISCOUNT_REQUEST
            )
          ).toBeDefined();

          expect(
            actions.find(
              (action) => action.type === PRIZES_GET_DISCOUNT_SUCCESS
            )
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Rewards.Count()).networkError();

        try {
          await store.dispatch(getDiscountCode("cardID", "providerID"));
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find(
              (action) => action.type === PRIZES_GET_DISCOUNT_REQUEST
            )
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === PRIZES_GET_DISCOUNT_FAIL)
          ).toBeDefined();
        }
      });
    });
  });
});
