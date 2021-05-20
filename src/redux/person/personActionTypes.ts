import { PersonReadDto } from "../../api/person/personDtos";

export const GET_PERSON_SUCCESS = "GET_PERSON_SUCCESS";
export const CREATE_PERSON_SUCCESS = "CREATE_PERSON_SUCCESS";

interface GetPersonAction {
  type: typeof GET_PERSON_SUCCESS
  person: PersonReadDto
}

interface CreatePersonAction {
  type: typeof CREATE_PERSON_SUCCESS
  person: PersonReadDto
}

export type PersonActionType = GetPersonAction | CreatePersonAction;
