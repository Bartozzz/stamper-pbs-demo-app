import Url from "../../constants/Urls";

// Actions
export const QUIZ_REQUEST = "APP/QUIZ/GET/REQUEST";
export const QUIZ_SUCCESS = "APP/QUIZ/GET/SUCCESS";
export const QUIZ_FAIL = "APP/QUIZ/GET/FAIL";

export const SETANSWER_REQUEST = "APP/QUIZ/ANSWER/REQUEST";
export const SETANSWER_SUCCESS = "APP/QUIZ/ANSWER/SUCCESS";
export const SETANSWER_FAIL = "APP/QUIZ/ANSWER/FAIL";

export const initialState = {
  title: undefined,
  question: undefined,
  correctAnswer: undefined,
  stamps: undefined,
  questionId: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_FAIL:
    case QUIZ_REQUEST:
      return {
        title: undefined,
        question: undefined,
        correctAnswer: undefined,
        stamps: undefined,
      };
    case QUIZ_SUCCESS:
      return {
        title: action.payload.data.title,
        question: action.payload.data.question,
        correctAnswer: action.payload.data.correctAnswer,
        stamps: action.payload.data.stamps,
        questionId: action.payload.data.id,
      };
    case SETANSWER_FAIL:
    case SETANSWER_REQUEST:
    case SETANSWER_SUCCESS:
    default:
      return state;
  }
}

export const getQuestion = () => ({
  types: [QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Quiz.GetQuestion(),
    },
  },
});

export const setAnswer = (questionId, correctAnswer) => ({
  types: [SETANSWER_REQUEST, SETANSWER_SUCCESS, SETANSWER_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Quiz.SetAnswer(),
      data: {
        questionId,
        correctAnswer,
      },
    },
  },
});
