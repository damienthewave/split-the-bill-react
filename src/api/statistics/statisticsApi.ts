import axios from "axios";
import { STAT_ALL_PERSON_EXPENSES_URL } from "../apiUrls";
import { handleError } from "../apiUtils";

export function getAllPersonExpensesApi() {
  return axios
    .get(STAT_ALL_PERSON_EXPENSES_URL)
    .then((response) => response.data)
    .catch(handleError);
}