import { appState } from "../appState";
import { SignupActionType, SIGNUP_SUCCESS } from "../signup/signupActionTypes";
import { LOGIN_SUCCESS, LoginActionType } from "./loginActionTypes";

export function loginReducer(
  state: typeof appState.userToken = appState.userToken,
  action: LoginActionType | SignupActionType
): typeof appState.userToken {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userToken;
    case SIGNUP_SUCCESS:
      return action.userToken;
    default:
      return state;
  }
}
