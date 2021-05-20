import { emptyUserTokenDto, UserTokenDto } from "../api/login/userTokenDto";
import { emptyPersonReadDto, PersonReadDto } from "../api/person/personDtos";
import { CurrencyReadDto, emptyCurrencyCollection } from "../api/currency/currencyDtos";

export const appState: AppState = {
  apiCallsInProgress: 0,
  userToken: emptyUserTokenDto,
  person: emptyPersonReadDto,
  currencies: emptyCurrencyCollection
};

export interface AppState {
  apiCallsInProgress: number;
  userToken: UserTokenDto;
  person: PersonReadDto;
  currencies: CurrencyReadDto[];
}
