export const ADD_LAUNCH = "APP/REVIEW/ADD";

export const initialState = {
  appLaunches: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LAUNCH:
      return { appLaunches: state.appLaunches + 1 };
    default:
      return state;
  }
}

export const addLaunch = () => ({
  type: ADD_LAUNCH,
});
