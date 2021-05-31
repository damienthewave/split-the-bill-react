import { GroupFormDto, GroupReadDto } from "../../api/group/groupDtos";

export const LOAD_GROUPS_SUCCESS = "LOAD_GROUPS_SUCCESS";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";

interface LoadGroupsAction {
  type: typeof LOAD_GROUPS_SUCCESS;
  groups: GroupReadDto[]
}

interface CreateGroupAction {
  type: typeof CREATE_GROUP_SUCCESS;
  group: GroupReadDto
}


export type GroupsActionType = LoadGroupsAction | CreateGroupAction;
