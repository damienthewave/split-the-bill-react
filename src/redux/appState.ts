import { emptyUserTokenDto, UserTokenDto } from "../api/login/userTokenDto";
import { emptyPersonReadDto, PersonReadDto } from "../api/person/personDtos";
import { emptyFriendships, Friendships } from "../api/friendships/friendshipDtos";
import { CurrencyReadDto, emptyCurrencyCollection } from "../api/currency/currencyDtos";
import { GroupReadDto, emptyGroupCollection } from "../api/group/groupDtos";

export const appState: AppState = {
  apiCallsInProgress: 0,
  userToken: emptyUserTokenDto,
  person: emptyPersonReadDto,
  currencies: emptyCurrencyCollection,
  friendships: emptyFriendships,
  groups: emptyGroupCollection
};

export interface AppState {
  apiCallsInProgress: number;
  userToken: UserTokenDto;
  person: PersonReadDto;
  currencies: CurrencyReadDto[];
  friendships: Friendships;
  groups: GroupReadDto[];
}
