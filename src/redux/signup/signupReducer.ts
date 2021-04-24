import { appState } from "../appState";
import { SignupActionType, SIGNUP_SUCCESS } from "./signupActionTypes";

export function signupReducer(
  state: typeof appState.userToken = appState.userToken,
  action: SignupActionType
): typeof appState.userToken {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return action.userToken;
    default:
      return state;
  }
}
