import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  MAP_GET_REQUEST,
  MAP_GET_SUCCESS,
  MAP_GET_FAIL,
  getRegion,
} from "./map";

describe("Map Store", () => {
  const store = mockStore();

  const data = {
    active: false,
    address: "adres",
    backgroundImageUrl: "backgroundurl",
    cardDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    companyDescription:
      "Company Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    countryIso: "pl",
    ecommerceUrl: "www.google.com",
    favorite: false,
    filter: "Test",
    filters: ["Test"],
    iconUrl: "iconurl",
    id: "id",
    inWallet: false,
    lat: "lat",
    lng: "lng",
    logoUrl: "logourl",
    merchantId: "1",
    merchantName: "Merchant Name",
    offline: true,
    online: false,
    openingHours: "Pon - Pt 07:00 - 09:00",
    phone: "123456789",
    position: 0,
    stampsTotal: 1,
    title: "Title",
    validDays: "0",
    validTo: true,
    validToDate: "01/01/1970",
    website: "www.google.pl",
  };
  const filters = ["Test"];

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("MAP_GET_REQUEST", () => {
      expect(reducer(initialState, { type: MAP_GET_REQUEST })).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it("MAP_GET_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: MAP_GET_SUCCESS,
          payload: {
            data: {
              cards: [data],
              filters: [filters],
            },
          },
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        data: [data],
        filters: [filters],
      });
    });

    it("MAP_GET_FAIL", () => {
      expect(reducer(initialState, { type: MAP_GET_FAIL })).toEqual({
        ...initialState,
        isLoading: false,
        data: [],
        filters: [],
      });
    });
  });

  describe("action", () => {
    describe("getRegion", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Region.Get()).reply(200);

        try {
          await store.dispatch(
            getRegion("Kraków", "pl", { latitude: 1, longitude: 1 })
          );
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === MAP_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === MAP_GET_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Region.Get()).networkError();

        try {
          await store.dispatch(
            getRegion("Kraków", "pl", { latitude: 1, longitude: 1 })
          );
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === MAP_GET_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === MAP_GET_FAIL)
          ).toBeDefined();
        }
      });
    });
  });
});
