export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const FETCH_FAILED = "FETCH_FAILED";
export const CANCEL = "CANCEL";
export const RESET = "RESET";
export const RANDOM = "RANDOM";

export function fetchFulfilled(beers) {
  return {
    type: FETCH_FULFILLED,
    payload: beers,
  };
}

export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message,
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
  };
}

export function fetchData() {
  return {
    type: FETCH_DATA,
  };
}

export function search(input) {
  return {
    type: SEARCH,
    payload: input,
  };
}

export function random() {
  return {
    type: RANDOM,
  };
}

export function cancel() {
  return {
    type: CANCEL,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
