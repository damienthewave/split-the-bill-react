export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

interface BeginApiCallAction {
  type: typeof BEGIN_API_CALL;
}

interface ApiCallError {
  type: typeof API_CALL_ERROR;
  message: string;
}

export type ApiStatusActionType = BeginApiCallAction | ApiCallError;

//Add | type for any other action type
export type ActionType = ApiStatusActionType;
