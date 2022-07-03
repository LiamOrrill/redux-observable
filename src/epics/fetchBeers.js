import { concat, of, fromEvent, race, merge, mapTo, forkJoin } from "rxjs";
import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  pluck,
  switchMap,
  withLatestFrom,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {
  fetchFulfilled,
  fetchFailed,
  CANCEL,
  SEARCH,
  setStatus,
  reset,
} from "../reducers/beersActions";
import { ofType } from "redux-observable";

const search = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const random = (apiBase) => `${apiBase}/random`;

export function fetchBeersEpic(action$, state$, { getJSON }) {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(pluck("config"))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = getJSON(
        search(config.apiBase, config.perPage, payload)
      ).pipe(
        map((resp) => fetchFulfilled(resp)),
        catchError((err) => {
          return of(fetchFailed(err.response.message));
        })
      );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter((evt) => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(mapTo(reset()));

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );
}
