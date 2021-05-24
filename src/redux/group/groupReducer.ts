import { appState } from "../appState";
import { GroupsActionType, LOAD_GROUPS_SUCCESS } from "./groupActionTypes";

export function groupReducer(
  state: typeof appState.groups = appState.groups,
  action: GroupsActionType
): typeof appState.groups {
  switch (action.type) {
    case LOAD_GROUPS_SUCCESS:
      return action.groups;
    default:
      return state;
  }
}
