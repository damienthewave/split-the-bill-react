import { combineReducers } from "redux";
import { apiStatusReducer } from "./api-status/apiStatusReducer";
import { loginReducer } from "./login/loginReducer";

export const rootReducer = combineReducers({
  apiCallsInProgress: apiStatusReducer,
  userToken: loginReducer,
});
