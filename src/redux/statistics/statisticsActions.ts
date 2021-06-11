import * as statisticsApi from "../../api/statistics/statisticsApi"
import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { DailyPersonExpenses } from "../../api/statistics/statisticsDtos";
import { LOAD_ALL_PERSON_EXPENSES_SUCCESS } from "./statisticsActionTypes";

function loadAllPersonExpensesSuccess() {
  return {type: LOAD_ALL_PERSON_EXPENSES_SUCCESS}
}

export function loadAllPersonExpenses() {
  return function(dispatch: Function) {
    dispatch(beginApiCall());
    return statisticsApi
      .getAllPersonExpensesApi()
      .then((response: DailyPersonExpenses) => {
        dispatch(loadAllPersonExpensesSuccess())
        return response
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}