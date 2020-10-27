import { mockApi, mockStore } from "../../mocks/store.mock";
import Url from "../../constants/Urls";

import reducer, {
  initialState,
  QUIZ_REQUEST,
  QUIZ_SUCCESS,
  QUIZ_FAIL,
  SETANSWER_REQUEST,
  SETANSWER_SUCCESS,
  SETANSWER_FAIL,
  getQuestion,
  setAnswer,
} from "./quiz";

describe("Popup Store", () => {
  const store = mockStore();

  const data = {
    title: "Title",
    question: "Question",
    correctAnswer: 1,
    stamps: 1,
    id: 123456,
  };

  describe("reducer", () => {
    it("no action", () => {
      expect(reducer(initialState, {})).toEqual(initialState);
    });

    it("QUIZ_REQUEST", () => {
      expect(reducer(initialState, { type: QUIZ_REQUEST })).toEqual({
        ...initialState,
      });
    });

    it("QUIZ_SUCCESS", () => {
      expect(
        reducer(initialState, {
          type: QUIZ_SUCCESS,
          payload: {
            data: {
              ...data,
            },
          },
        })
      ).toEqual({
        title: data.title,
        question: data.question,
        correctAnswer: data.correctAnswer,
        stamps: data.stamps,
        questionId: data.id,
      });
    });

    it("QUIZ_FAIL", () => {
      expect(reducer(initialState, { type: QUIZ_FAIL })).toEqual({
        ...initialState,
      });
    });

    it("SETANSWER_FAIL", () => {
      expect(reducer(initialState, { type: SETANSWER_FAIL })).toEqual({
        ...initialState,
      });
    });

    it("SETANSWER_REQUEST", () => {
      expect(reducer(initialState, { type: SETANSWER_REQUEST })).toEqual({
        ...initialState,
      });
    });

    it("SETANSWER_SUCCESS", () => {
      expect(reducer(initialState, { type: SETANSWER_SUCCESS })).toEqual({
        ...initialState,
      });
    });
  });

  describe("action", () => {
    describe("getQuestion", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Quiz.GetQuestion()).reply(200);

        try {
          await store.dispatch(getQuestion());
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === QUIZ_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === QUIZ_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Quiz.GetQuestion()).networkError();

        try {
          await store.dispatch(getQuestion());
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === QUIZ_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === QUIZ_FAIL)
          ).toBeDefined();
        }
      });
    });

    describe("setAnswer", () => {
      it("on success", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Quiz.SetAnswer()).reply(200);

        try {
          await store.dispatch(setAnswer(data.questionId, data.correctAnswer));
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === SETANSWER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === SETANSWER_SUCCESS)
          ).toBeDefined();
        } catch (err) {}
      });

      it("on failure", async () => {
        mockApi.reset();
        mockApi.onPost(Url.Quiz.SetAnswer()).networkError();

        try {
          await store.dispatch(setAnswer(data.questionId, data.correctAnswer));
        } catch (err) {
          const actions = store.getActions();

          expect(
            actions.find((action) => action.type === SETANSWER_REQUEST)
          ).toBeDefined();

          expect(
            actions.find((action) => action.type === SETANSWER_FAIL)
          ).toBeDefined();
        }
      });
    });
  });
});
