import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import { appState } from "./appState";

export function configureStore(): Store {
  const composeEnhancers = composeWithDevTools({});

  return createStore(
    rootReducer,
    appState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
