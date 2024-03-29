import {
  FETCH_FULFILLED,
  SET_STATUS,
  FETCH_FAILED,
  CANCEL,
  RESET,
} from "./beersActions";

const initialState = {
  data: [],
  status: "idle", // idle, loading, fulfilled, error
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case CANCEL: {
      return {
        ...state,
        status: "idle",
        messages: [],
      };
    }

    case RESET: {
      return {
        ...state,
        status: "idle",
        messages: [],
      };
    }

    case FETCH_FULFILLED:
      return {
        ...state,
        status: "success",
        data: action.payload,
        messages: [],
      };

    case FETCH_FAILED:
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload,
          },
        ],
      };

    default:
      return state;
  }
}
