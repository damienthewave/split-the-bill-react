import axios from "axios";
import { CURRENCIES_URL } from "../apiUrls";
import { handleError } from "../apiUtils";
import { CurrencyReadDto } from "./currencyDtos";

export function loadCurrenciesApi() {
  return axios.get<CurrencyReadDto[]>(CURRENCIES_URL)
    .then(response => response.data)
    .catch(handleError);
}
