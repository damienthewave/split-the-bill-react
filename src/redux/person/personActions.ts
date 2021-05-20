import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { CREATE_PERSON_SUCCESS, GET_PERSON_SUCCESS, PersonActionType } from "./personActionTypes";
import * as personApi from "../../api/person/personApi";
import { PersonCreateDto, PersonReadDto } from "../../api/person/personDtos";


function getPersonSuccess(person: PersonReadDto) : PersonActionType {
  return { type: GET_PERSON_SUCCESS, person }
}

function createPersonSuccess(person: PersonReadDto) : PersonActionType {
  return { type: CREATE_PERSON_SUCCESS, person }
}

export function getPerson() {
  return function(dispatch: Function) {
    dispatch(beginApiCall())
    return personApi.getPerson()
      .then((person) => dispatch(getPersonSuccess(person)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}

export function createPerson(personCreateDto: PersonCreateDto) {
  return function(dispatch: Function) {
    dispatch(beginApiCall())
    return personApi.createPerson(personCreateDto)
      .then((person) => dispatch(createPersonSuccess(person)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}
