import { combineReducers } from "redux";
import { apiStatusReducer } from "./api-status/apiStatusReducer";

export const rootReducer = combineReducers({
  apiCallsInProgress: apiStatusReducer,
});
