import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { CREATE_GROUP_SUCCESS, GroupsActionType, LOAD_GROUPS_SUCCESS } from "./groupActionTypes";
import * as groupApi from "../../api/group/groupApi";
import { GroupFormDto, GroupReadDto } from "../../api/group/groupDtos";

function loadGroupSuccess(groups: GroupReadDto[] | void): GroupsActionType {
  return { type: LOAD_GROUPS_SUCCESS, groups } as GroupsActionType;
}
function createGroupSuccess(group: GroupReadDto | void): GroupsActionType {
  return { type: CREATE_GROUP_SUCCESS, group } as GroupsActionType;
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

export function createGroup(groupCreateDto: GroupFormDto) {
  return function(dispatch: Function) {
    dispatch(beginApiCall())
    return groupApi.createGroup(groupCreateDto)
      .then((group) => {
        return dispatch(createGroupSuccess(group))})
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}