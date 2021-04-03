import { API_CALL_ERROR, BEGIN_API_CALL } from "./apiStatusActionTypes";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

export function apiCallError(message: string) {
  return { type: API_CALL_ERROR, message };
}
