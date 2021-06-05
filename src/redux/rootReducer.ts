import { combineReducers } from "redux";
import { apiStatusReducer } from "./api-status/apiStatusReducer";
import { loginReducer } from "./login/loginReducer";
import { personReducer } from "./person/personReducer";
import { currencyReducer } from "./currency/currencyReducer";
import { friendshipReducer } from "./friendships/friendshipReducer";
import { groupReducer } from "./group/groupReducer";

export const rootReducer = combineReducers({
  apiCallsInProgress: apiStatusReducer,
  userToken: loginReducer,
  person: personReducer,
  currencies: currencyReducer,
  friendships: friendshipReducer,
  groups: groupReducer
});
