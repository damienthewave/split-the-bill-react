import { ActionType, API_CALL_ERROR, BEGIN_API_CALL } from "./apiStatusActionTypes";
import { appState } from "../appState";

function actionTypeEndsWithSuccess(type: string) {
  return type.endsWith("_SUCCESS");
}

export function apiStatusReducer(
  state: number = appState.apiCallsInProgress,
  action: ActionType
): number {
  switch (action.type) {
    case BEGIN_API_CALL:
      return state + 1;
    case API_CALL_ERROR:
      return state - 1;
    default:
      return actionTypeEndsWithSuccess(action.type)
        ? state - 1
        : state;
  }
}
