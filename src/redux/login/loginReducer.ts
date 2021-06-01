import { appState } from "../appState";
import { SIGNUP_SUCCESS, SignupActionType } from "../signup/signupActionTypes";
import {
  LOAD_COOKIE_TOKEN,
  LOGIN_SUCCESS,
  LoginActionType,
  LOGOUT,
} from "./loginActionTypes";
import { emptyUserTokenDto } from "../../api/login/userTokenDto";

export function loginReducer(
  state: typeof appState.userToken = appState.userToken,
  action: LoginActionType | SignupActionType
): typeof appState.userToken {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userToken;
    case SIGNUP_SUCCESS:
      return action.userToken;
    case LOAD_COOKIE_TOKEN:
      return action.userToken;
    case LOGOUT:
      return emptyUserTokenDto;
    default:
      return state;
  }
}
