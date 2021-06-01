import { applyMiddleware, compose, createStore, Store } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import { AppState, appState } from "./appState";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export function configureStore(): Store<AppState> {
  const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;

  return createStore(
    rootReducer,
    appState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
