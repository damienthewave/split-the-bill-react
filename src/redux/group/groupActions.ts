import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { GroupsActionType, LOAD_GROUPS_SUCCESS } from "./groupActionTypes";
import * as groupApi from "../../api/group/groupApi";
import { GroupReadDto } from "../../api/group/groupDtos";

function loadGroupSuccess(groups: GroupReadDto[] | void): GroupsActionType {
  return { type: LOAD_GROUPS_SUCCESS, groups } as GroupsActionType;
}

export function loadGroups() {
  return function(dispatch: Function) {
    dispatch(beginApiCall());
    return groupApi
      .loadGroupsApi()
      .then((groups: GroupReadDto[] | void) => dispatch(loadGroupSuccess(groups)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
