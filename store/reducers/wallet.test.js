import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  WALLET_GET_REQUEST,
  WALLET_GET_SUCCESS,
  WALLET_GET_FAIL,
  WALLET_ADD_CARD_REQUEST,
  WALLET_ADD_CARD_SUCCESS,
  WALLET_ADD_CARD_FAIL,
  WALLET_REMOVE_CARD_REQUEST,
  WALLET_REMOVE_CARD_SUCCESS,
  WALLET_REMOVE_CARD_FAIL,
  getWallet,
  addCard,
  removeCard,
} from "./wallet";

describe("Wallet reducer", () => {
  const store = mockStore();

  const data = {
    cards: [
      {
        address: "ul. Urzędnicza 35, Kraków",
        cardNumber: "100000595",
        cardOnly: false,
        cardUrl: null,
        companyDescription: "company description",
        description: "description",
        ecommerceUrl: "www.google.com",
        iconUrl: "https://a.static.getstamper.com/icons/zabieg_200.png",
        id: "769f60be-3f5d-4a13-b894-9ffe3ff676d2",
        logoUrl:
          "https://a.static.getstamper.com/logos/755e0172-f557-4f66-7c83-08d680c25417_stampr-sygnet.png",
        merchantName: "Stamper",
        openingHours: "Pon - Pt 07:00 - 09:00",
        phone: "601 910 484",
        position: 0,
        promoCardId: "89deb3bf-ad37-44aa-0b24-08d7168f1fc9",
        stampsToDate: 0,
        stampsTotal: 5,
        termsAndConditionsUrl:
          "https://stamper-admin-panel-pl-staging.azurewebsites.net/TermsAndConditions/Card/89deb3bf-ad37-44aa-0b24-08d7168f1fc9",
        title: "Zabieg",
        validToDate: "2020-10-25T08:37:46.0207986+00:00",
        website: "www.google.pl",
      },
    ],
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("WALLET_GET_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: WALLET_GET_REQUEST,
        })
      ).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it("WALLET_GET_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: WALLET_GET_SUCCESS,
          payload: {
            data: {
              ...data,
            },
          },
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        cards: data.cards,
      });
    });

    it("WALLET_GET_FAIL", () => {
      expect(
        reducer(initialState, {
          type: WALLET_GET_FAIL,
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        cards: [],
      });
    });

    it("WALLET_REMOVE_CARD_REQUEST", () => {
      expect(
        reducer(initialState, {
          type: WALLET_REMOVE_CARD_REQUEST,
          payload: {
            data: {
              ...data,
            },
            request: {
              data: {
                cardId: "769f60be-3f5d-4a13-b894-9ffe3ff676d2",
              },
            },
          },
        })
      ).toEqual({
        ...initialState,
        cards: data.cards.filter((card) => card.id !== data.cards[0].id),
      });
    });
  });

  describe("getWallet", () => {
    it("on success", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Wallet.Get()).reply(200);

      try {
        await store.dispatch(getWallet());
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_GET_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_GET_SUCCESS)
        ).toBeDefined();
      } catch (err) {}
    });

    it("on failure", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Wallet.Get()).networkError();

      try {
        await store.dispatch(getWallet());
      } catch (err) {
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_GET_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_GET_FAIL)
        ).toBeDefined();
      }
    });
  });

  describe("addCard", () => {
    it("on success", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Card.Add()).reply(200);

      try {
        await store.dispatch(addCard(data.cards[0].id));
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_ADD_CARD_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_ADD_CARD_SUCCESS)
        ).toBeDefined();
      } catch (err) {}
    });

    it("on failure", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Card.Add()).networkError();

      try {
        await store.dispatch(addCard(data.cards[0].id));
      } catch (err) {
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_ADD_CARD_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_ADD_CARD_FAIL)
        ).toBeDefined();
      }
    });
  });

  describe("removeCard", () => {
    it("on success", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Card.Remove()).reply(200);

      try {
        await store.dispatch(removeCard(data.cards[0].id));
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_REMOVE_CARD_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_REMOVE_CARD_SUCCESS)
        ).toBeDefined();
      } catch (err) {}
    });

    it("on failure", async () => {
      mockApi.reset();
      mockApi.onPost(Url.Card.Remove()).networkError();

      try {
        await store.dispatch(removeCard(data.cards[0].id));
      } catch (err) {
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === WALLET_REMOVE_CARD_REQUEST)
        ).toBeDefined();

        expect(
          actions.find((action) => action.type === WALLET_REMOVE_CARD_FAIL)
        ).toBeDefined();
      }
    });
  });
});
