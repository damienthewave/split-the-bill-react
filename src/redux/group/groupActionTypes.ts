import { GroupReadDto } from "../../api/group/groupDtos";

export const LOAD_GROUPS_SUCCESS = "LOAD_GROUPS_SUCCESS";

interface LoadGroupsAction {
  type: typeof LOAD_GROUPS_SUCCESS;
  groups: GroupReadDto[]
}

export type GroupsActionType = LoadGroupsAction;
