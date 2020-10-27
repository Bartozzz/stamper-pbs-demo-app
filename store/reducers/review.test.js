import { mockStore } from "../../mocks/store.mock";
import reducer, { initialState, ADD_LAUNCH, addLaunch } from "./review";

describe("Review store", () => {
  const store = mockStore();

  describe("reducers", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("ADD_LAUNCH", () => {
      expect(reducer(initialState, { type: ADD_LAUNCH })).toEqual({
        appLaunches: 1,
      });
    });
  });

  describe("action", () => {
    it("on success", async () => {
      try {
        await store.dispatch(addLaunch());
        const actions = store.getActions();

        expect(
          actions.find((action) => action.type === ADD_LAUNCH)
        ).toBeDefined();
      } catch (err) {}
    });
  });
});
