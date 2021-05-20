import { CurrencyReadDto } from "../../api/currency/currencyDtos";

export const LOAD_CURRENCIES_SUCCESS = "LOAD_CURRENCIES_SUCCESS";

interface LoadCurrenciesAction {
  type: typeof LOAD_CURRENCIES_SUCCESS;
  currencies: CurrencyReadDto[]
}

export type CurrencyActionType = LoadCurrenciesAction;
