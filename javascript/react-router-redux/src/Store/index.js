import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import reducers from "../reducers";

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(logger, thunk)
)

store.subscribe(
  throttle(() => {
    saveState({
      counter: store.getState().counter,
      todos: store.getState().todos
    });
  }, 1000)
);

export default store;
