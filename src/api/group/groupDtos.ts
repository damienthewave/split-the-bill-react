import { HalLink } from "../halLink";

export interface GroupReadDto {
  groupId: number
  groupMemberId: number
  personId: number
  name: string
  memberBalance: Map<string, number>
}

export interface GroupDetailDto{
  id: number
  name: string
  photoPath: string
  members: GroupReadDto[]
}

export const emptyGroupCollection: GroupReadDto[] = [];

export interface GroupFormDto{
  name: string,
  membersIds: number[]
}

export const EmptyGroupDetailDto: GroupDetailDto = {
  id: 0,
  name: "",
  photoPath: "",
  members: []
}
// export const emptyGroupReadDto: GroupReadDto = {
//   groupId: 0,
//   groupMemberId: 0,
//   personId: 0,
//   name: "",
//   memberBalance: new Map<string, number>()
// }
