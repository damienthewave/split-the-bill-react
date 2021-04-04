import { appState } from "../appState";
import { LoginActionType, LOGIN_SUCCESS } from "./loginActionTypes";

export function loginReducer(
  state: typeof appState.userToken = appState.userToken,
  action: LoginActionType
): typeof appState.userToken {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userToken;
    default:
      return state;
  }
}
