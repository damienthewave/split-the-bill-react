import axios from "axios";
import { PEOPLE_URL } from "../apiUrls";
import { handleError } from "../apiUtils";
import { PersonCreateDto } from "./personDtos";

export function getPerson() {
  return axios.get(PEOPLE_URL)
    .then(response => response.data)
    .catch(handleError);
}

export function createPerson(personCreateDto: PersonCreateDto) {
  return axios.post(PEOPLE_URL, personCreateDto)
    .then(response => response.data)
    .catch(handleError);
}
