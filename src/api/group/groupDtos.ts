import { ExpenseReadDto } from "./expenseDtos";

export interface GroupReadDto {
  groupId: number;
  groupMemberId: number;
  personId: number;
  groupName: string;
  personName: string;
  memberBalance: Map<string, number>;
}

export interface GroupDetailDto {
  id: number;
  name: string;
  photoPath: string;
  members: GroupReadDto[];
  expenses: ExpenseReadDto[];
}

export interface GroupFormDto {
  name: string;
  membersIds: number[];
  photoPath: string;
}

export const EmptyGroupDetailDto: GroupDetailDto = {
  id: 0,
  name: "",
  photoPath: "",
  members: [],
  expenses: [],
};

export const emptyGroupCollection: GroupReadDto[] = [];
