import { appState } from "../appState";
import { CREATE_PERSON_SUCCESS, GET_PERSON_SUCCESS, PersonActionType } from "./personActionTypes";

export function personReducer(
  state: typeof appState.person = appState.person,
  action: PersonActionType
): typeof appState.person {
  switch (action.type) {
    case GET_PERSON_SUCCESS:
      return action.person;
    case CREATE_PERSON_SUCCESS:
      return action.person;
    default:
      return state;
  }
}
