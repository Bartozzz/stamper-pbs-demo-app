// Keys used for local storage:
export const APP_LAUNCHES = "appLaunches";

// Actions
export const ADD_LAUNCH = "APP/REVIEW/ADD";
export const RESTORE_LAUNCHES = "APP/REVIEW/RESTORE";

const initialState = {
  appLaunches: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LAUNCH:
      return { appLaunches: state.appLaunches + 1 };
    case RESTORE_LAUNCHES:
      return { appLaunches: action.payload };
    default:
      return state;
  }
}

export const addLaunch = () => ({
  type: ADD_LAUNCH,
});

export const restoreLaunches = (appLaunches) => ({
  type: RESTORE_LAUNCHES,
  payload: appLaunches,
});
