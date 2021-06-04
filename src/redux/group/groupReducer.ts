import { appState } from "../appState";
import { CREATE_GROUP_SUCCESS, GroupsActionType, LOAD_GROUPS_SUCCESS } from "./groupActionTypes";

export function groupReducer(
  state: typeof appState.groups = appState.groups,
  action: GroupsActionType
): typeof appState.groups {
  switch (action.type) {
    case LOAD_GROUPS_SUCCESS:
      return action.groups;
    case CREATE_GROUP_SUCCESS:
      return [...state]
    default:
      return state;
  }
}
