import { appState } from "../appState";
import { CurrencyActionType, LOAD_CURRENCIES_SUCCESS } from "./currencyActionTypes";

export function currencyReducer(
  state: typeof appState.currencies = appState.currencies,
  action: CurrencyActionType
): typeof appState.currencies {
  switch (action.type) {
    case LOAD_CURRENCIES_SUCCESS:
      return action.currencies;
    default:
      return state;
  }
}
