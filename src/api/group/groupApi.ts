import axios from "axios";
import { GROUPS_URL } from "../apiUrls";
import { handleError } from "../apiUtils";
import { GroupReadDto, GroupDetailDto, GroupFormDto } from "./groupDtos";

export function loadGroupsApi() {
  return axios.get<GroupReadDto[]>(GROUPS_URL)
    .then(response => response.data)
    .catch(handleError);
}

export function loadGroupDetails(groupId: number) {
  return axios.get<GroupDetailDto>(GROUPS_URL + "/" + groupId)
    .then(response => response.data)
    .catch(handleError);
}

export function createGroup(groupCreateDto: GroupFormDto) {
  console.log("groupApi groupcreateDto: " + groupCreateDto)
  return axios.post(GROUPS_URL, groupCreateDto)
    .then(response => {console.log("groupApi: " + response.data); return response.data})
    .catch(handleError);
}