import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { CurrencyActionType, LOAD_CURRENCIES_SUCCESS } from "./currencyActionTypes";
import * as currencyApi from "../../api/currency/currencyApi";
import { CurrencyReadDto } from "../../api/currency/currencyDtos";

function loadCurrencySuccess(currencies: CurrencyReadDto[] | void): CurrencyActionType {
  return { type: LOAD_CURRENCIES_SUCCESS, currencies } as CurrencyActionType;
}

export function loadCurrencies() {
  return function(dispatch: Function) {
    dispatch(beginApiCall());
    return currencyApi
      .loadCurrenciesApi()
      .then((currencies: CurrencyReadDto[] | void) => dispatch(loadCurrencySuccess(currencies)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
