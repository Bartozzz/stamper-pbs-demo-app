import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  STAMP_ADD_REQUEST,
  STAMP_ADD_SUCCESS,
  STAMP_ADD_FAIL,
  addStamp,
} from "./stamp";

describe("Stamp store", () => {
  const store = mockStore();

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("STAMP_ADD_REQUEST", () => {
      expect(reducer(initialState, { type: STAMP_ADD_REQUEST })).toEqual({
        isAdding: true,
      });
    });

    it("STAMP_ADD_SUCCESS", () => {
      expect(reducer(initialState, { type: STAMP_ADD_SUCCESS })).toEqual({
        isAdding: false,
      });
    });

    it("STAMP_ADD_FAIL", () => {
      expect(reducer(initialState, { type: STAMP_ADD_FAIL })).toEqual({
        isAdding: false,
      });
    });
  });

  describe("actions", () => {
    describe("addStamp", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Stamp.Add()).reply(200);

        try {
          await store.dispatch(addStamp("code", "id", true));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === STAMP_ADD_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === STAMP_ADD_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Stamp.Add()).networkError();

        try {
          await store.dispatch(addStamp("code", "id", true));
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === STAMP_ADD_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === STAMP_ADD_FAIL)
          ).toBeDefined();
        }
      });
    });
  });
});
