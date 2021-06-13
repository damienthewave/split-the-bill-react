import axios from "axios";
import {
  GROUPS_ADD_EXPENSE_URL,
  GROUPS_ADD_MEMBER_URL,
  GROUPS_URL,
} from "../apiUrls";
import { handleError } from "../apiUtils";
import { GroupReadDto, GroupDetailDto, GroupFormDto } from "./groupDtos";
import { ExpenseCreateDto } from "./expenseDtos";

export function loadGroupsApi() {
  return axios
    .get<GroupReadDto[]>(GROUPS_URL)
    .then((response) => response.data)
    .catch(handleError);
}

export function loadGroupDetails(groupId: number) {
  return axios
    .get<GroupDetailDto>(GROUPS_URL + "/" + groupId)
    .then((response) => response.data)
    .catch(handleError);
}

export function createGroup(groupCreateDto: GroupFormDto) {
  return axios
    .post(GROUPS_URL, groupCreateDto)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export function addGroupMember(groupId: number, personId: number) {
  return axios
    .patch(GROUPS_ADD_MEMBER_URL(groupId, personId))
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export function addGroupExpense(groupId: number, expense: ExpenseCreateDto) {
  return axios
    .post(GROUPS_ADD_EXPENSE_URL(groupId), expense)
    .then((response) => response.data)
    .catch(handleError);
}
